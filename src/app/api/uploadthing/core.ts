import { db } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const auth = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

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
      console.log('________________________');
      console.log(sameFile);
      console.log(user);
      console.log(files[0]);
      if (sameFile) throw new UploadThingError('File already exists');
      throw new UploadThingError('Unauthorized');
      return { userId: user.id };
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log('ut core');
      console.log(metadata);
      console.log(file);
      return { status: 'Success' };
    }),
  // .onUploadComplete(async ({ metadata, file }) => {
  //   // This code RUNS ON YOUR SERVER after upload
  //   console.log("Upload complete for userId:", metadata.userId);

  //   console.log("file url", file.url);

  //   // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
  //   return { uploadedBy: metadata.userId };
  // }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
