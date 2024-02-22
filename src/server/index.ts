import { z } from 'zod';
import { authenticatedProcedure, publicProcedure, router } from './trpc';
import { db } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError } from '@trpc/server';

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.email) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (dbUser) return { success: true };

    try {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }

    return { success: true };
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
  deleteFile: authenticatedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const file = await db.file.delete({
        where: {
          id: input.id,
          userId: ctx.user.id,
        },
      });

      return file;
    }),
});

export type AppRouter = typeof appRouter;
