import { authenticatedProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { kindeAuth } from '@/lib/kindeAuth';
import { db } from '@/lib/prisma';
import { z } from 'zod';
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { ChatOpenAI } from '@langchain/openai';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import promptTemplate from '@/lib/promptTemplate';

export const appRouter = router({
  requestPlanUpgrade: authenticatedProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx;

    await db.user.update({
      data: {
        uploadLimit: 'PENDING',
      },
      where: {
        id: user.id,
      },
    });

    return { status: 'success' };
  }),
  getUserFiles: authenticatedProcedure.query(async ({ ctx }) => {
    const { user } = ctx;

    const files = await db.file.findMany({
      where: {
        userId: user.id,
      },
    });
    return files;
  }),
  getFileMessages: authenticatedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { user } = ctx;
      const limit = input.limit ?? 4;
      const { cursor } = input;

      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId: user.id,
        },
      });

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' });

      const messages = await db.message.findMany({
        take: limit + 1,
        where: {
          fileId: file.id,
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (messages.length > limit) {
        const nextItem = messages.pop();
        nextCursor = nextItem?.id;
      }

      return {
        messages,
        nextCursor,
      };
    }),
  deleteFile: authenticatedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const file = await db.file.delete({
        where: {
          id: input.id,
          userId: ctx.user.id,
        },
      });

      return file;
    }),
  sendMessage: authenticatedProcedure
    .input(
      z.object({
        fileid: z.string().uuid(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const file = await db.file.findFirst({
        where: {
          id: input.fileid,
          userId: ctx.user.id,
        },
      });

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' });

      const previousMessages = await db.message.findMany({
        where: {
          fileId: file.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 6,
      });

      let chatHistory: String[] = [];
      if (previousMessages.length > 4) {
        previousMessages.map((message) =>
          message.userId
            ? chatHistory.push(`Human: ${message.body}\n`)
            : chatHistory.push(`Assistant: ${message.body}\n`)
        );
      } else {
        chatHistory.push('No previous conversations.');
      }

      const newUserMessage = await db.message.create({
        data: {
          body: input.message,
          userId: ctx.user.id,
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

      const results = await vectorStore.similaritySearch(input.message, 4);

      const llm = new ChatOpenAI({
        modelName: 'gpt-3.5-turbo',
        temperature: 0,
      });

      const customRagPrompt = PromptTemplate.fromTemplate(
        promptTemplate(chatHistory)
      );

      const ragChain = await createStuffDocumentsChain({
        llm,
        prompt: customRagPrompt,
        outputParser: new StringOutputParser(),
      });

      const answer = await ragChain.invoke({
        question: input.message,
        context: results,
      });

      const newAiMessage = await db.message.create({
        data: {
          body: answer,
          fileId: file.id,
        },
      });

      return { status: 'success' };
    }),
});

export type AppRouter = typeof appRouter;
