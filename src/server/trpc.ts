import { kindeAuth } from '@/lib/kindeAuth';
import { TRPCError, initTRPC } from '@trpc/server';

const t = initTRPC.create();

const isAuthenticated = t.middleware(async (opts) => {
  const user = await kindeAuth();

  if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return opts.next({
    ctx: {
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const authenticatedProcedure = t.procedure.use(isAuthenticated);
