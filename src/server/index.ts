import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { db } from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError } from '@trpc/server';

export const appRouter = router({});

export type AppRouter = typeof appRouter;
