'use server';

import { kindeAuth } from '@/lib/kindeAuth';
import { db } from '@/lib/prisma';
import { z } from 'zod';
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { pull } from 'langchain/hub';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { promptTemplate } from '@/lib/promptTemplate';

const inputSchema = z.object({
  fileid: z.string().uuid(),
  message: z.string().min(1),
});

export async function sendMessage(formData: FormData) {
  const result = inputSchema.safeParse({
    fileid: formData.get('fileid'),
    message: formData.get('messageInput'),
  });

  if (!result.success) {
    return { error: 'Invalid message input' };
  }

  const user = await kindeAuth();
  if (!user || !user.id) return { error: 'Invalid user session.' };

  const data = result.data;

  const file = await db.file.findFirst({
    where: {
      id: data.fileid,
      userId: user.id,
    },
  });

  if (!file) return { error: 'File does not exist.' };

  const newUserMessage = await db.message.create({
    data: {
      body: data.message,
      userId: user.id,
      fileId: file.id,
    },
  });
  const pinecone = new Pinecone();
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    }),
    {
      pineconeIndex,
      namespace: file.id,
    }
  );

  const results = await vectorStore.similaritySearch(data.message, 4);

  const llm = new ChatOpenAI({ modelName: 'gpt-3.5-turbo', temperature: 0 });
  const customRagPrompt = PromptTemplate.fromTemplate(promptTemplate);

  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt: customRagPrompt,
    outputParser: new StringOutputParser(),
  });

  const answer = await ragChain.invoke({
    question: data.message,
    context: results,
  });

  const newAiMessage = await db.message.create({
    data: {
      body: answer,
      fileId: file.id,
    },
  });

  console.log(answer);

  return { data };
}
