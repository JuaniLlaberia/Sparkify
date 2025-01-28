import { getAuthUserId } from '@convex-dev/auth/server';
import { mutation, query } from './_generated/server';
import { isAuth } from './helper';
import { ConvexError, v } from 'convex/values';

export const currentUser = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const updateUsersTokens = mutation({
  args: { tokens: v.number() },
  handler: async (ctx, { tokens }) => {
    const user = await isAuth(ctx);
    if (!user)
      throw new ConvexError('You must be logged in to delete your account');

    await ctx.db.patch(user._id, { tokens });
  },
});

export const deleteUser = mutation({
  args: {},
  handler: async ctx => {
    const user = await isAuth(ctx);
    if (!user)
      throw new ConvexError('You must be logged in to delete your account');

    await ctx.db.delete(user._id);
  },
});
