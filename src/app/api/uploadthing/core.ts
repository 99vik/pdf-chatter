import { kindeAuth } from '@/lib/kindeAuth';
import { db } from '@/lib/prisma';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';

const f = createUploadthing();

const auth = async () => {
  const user = await kindeAuth();

  return user;
};

async function uploadComplete({
  metadata,
  file,
}: {
  metadata: {
    userId: string;
  };
  file: {
    key: string;
    name: string;
    url: string;
  };
}) {
  const createdFile = await db.file.create({
    data: {
      name: file.name,
      userId: metadata.userId,
      url: file.url,
      key: file.key,
    },
  });

  try {
    const res = await fetch(createdFile.url);
    const blob = await res.blob();
    const loader = new PDFLoader(blob);
    const docs = await loader.load();

    const pinecone = new Pinecone();
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

    await PineconeStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
      }),
      {
        pineconeIndex,
        namespace: createdFile.id,
      }
    );

    await db.file.update({
      where: {
        id: createdFile.id,
      },
      data: {
        uploadStatus: 'SUCCESS',
      },
    });
  } catch (e) {
    await db.file.update({
      where: {
        id: createdFile.id,
      },
      data: {
        uploadStatus: 'FAILED',
      },
    });
  }

  return { fileId: createdFile.id };
}

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '512KB', maxFileCount: 1 } })
    .middleware(async ({ files }) => {
      const user = await auth();

      if (!user || !user.id) throw new UploadThingError('Unauthorized');

      const userFiles = await db.file.findMany({
        where: {
          userId: user.id,
        },
      });

      if (userFiles.length >= 4)
        throw new UploadThingError('You have too many uploaded files.');

      const sameFile = await db.file.findFirst({
        where: {
          userId: user.id,
          name: files[0].name,
        },
      });

      if (sameFile) throw new UploadThingError('File already exists');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) =>
      uploadComplete({ metadata, file })
    ),
  upgradedPdfUploader: f({ pdf: { maxFileSize: '8MB', maxFileCount: 1 } })
    .middleware(async ({ files }) => {
      const user = await auth();

      if (!user || !user.id) throw new UploadThingError('Unauthorized');

      const dbUser = await db.user.findFirst({
        where: {
          id: user.id,
        },
      });

      if (!dbUser || dbUser.uploadLimit !== 'VIP')
        throw new UploadThingError('Unauthorized.');

      const userFiles = await db.file.findMany({
        where: {
          userId: user.id,
        },
      });

      if (userFiles.length >= 8)
        throw new UploadThingError('You have too many uploaded files.');

      const sameFile = await db.file.findFirst({
        where: {
          userId: user.id,
          name: files[0].name,
        },
      });

      if (sameFile) throw new UploadThingError('File already exists');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) =>
      uploadComplete({ metadata, file })
    ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
