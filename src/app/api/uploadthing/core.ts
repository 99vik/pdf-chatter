import { kindeAuth } from '@/lib/kindeAuth';
import { db } from '@/lib/prisma';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const auth = async () => {
  const user = await kindeAuth();

  return user;
};

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(async ({ files }) => {
      const user = await auth();

      if (!user || !user.id) throw new UploadThingError('Unauthorized');

      const sameFile = await db.file.findFirst({
        where: {
          userId: user.id,
          name: files[0].name,
        },
      });

      if (sameFile) throw new UploadThingError('File already exists');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.file.create({
        data: {
          name: file.name,
          userId: metadata.userId,
          url: file.url,
          key: file.key,
        },
      });
      return { fileId: createdFile.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
