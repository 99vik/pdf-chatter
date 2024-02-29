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
});

export type AppRouter = typeof appRouter;
