import { getAuthUserId } from '@convex-dev/auth/server';

import { MutationCtx, QueryCtx } from './_generated/server';

export const isAuth = async (ctx: QueryCtx | MutationCtx) => {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    return null;
  }
  return await ctx.db.get(userId);
};
