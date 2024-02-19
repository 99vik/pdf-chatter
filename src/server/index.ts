import { z } from 'zod';
import { publicProcedure, router } from './trpc';
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
  getUserFiles: publicProcedure.query(() => {
    return [
      {
        id: 1,
        name: 'file name1',
      },
      {
        id: 2,
        name: 'file name2',
      },
      {
        id: 3,
        name: 'file name3',
      },
      {
        id: 4,
        name: 'file name4',
      },
    ];
  }),
});

export type AppRouter = typeof appRouter;
