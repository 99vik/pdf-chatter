import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { db } from '@/lib/prisma';

export const appRouter = router({
  getUsers: publicProcedure.query(async () => {
    const users = await db.user.findMany();
    return users;
  }),
});

export type AppRouter = typeof appRouter;
