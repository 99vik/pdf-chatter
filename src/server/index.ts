import { z } from 'zod';
import { authenticatedProcedure, publicProcedure, router } from './trpc';
import { db } from '@/lib/prisma';
import { TRPCError } from '@trpc/server';
import { kindeAuth } from '@/lib/kindeAuth';

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const user = await kindeAuth();

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
  getFileMessages: authenticatedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { user } = ctx;

      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId: user.id,
        },
      });

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' });

      const messages = await db.message.findMany({
        where: {
          fileId: file.id,
        },
      });

      return messages;
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
});

export type AppRouter = typeof appRouter;
