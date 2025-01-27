import { ConvexError, v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { Messages } from './schema';
import { isAuth } from './helper';

export const getMessages = query({
  args: { chatId: v.id('chats') },
  handler: async (ctx, { chatId }) => {
    const user = await isAuth(ctx);
    if (!user)
      throw new ConvexError('You must be logged in to access messages');

    const messages = await ctx.db
      .query('messages')
      .withIndex('chatId', q => q.eq('chatId', chatId))
      .collect();

    const messagesWithImage = await Promise.all(
      messages.map(message => {
        return {
          ...message,
          user: message.role === 'user' ? user.fullName : undefined,
          image: message.role === 'user' ? user.image : undefined,
        };
      })
    );

    return messagesWithImage;
  },
});

export const createMessage = mutation({
  args: {
    role: Messages.withoutSystemFields.role,
    content: v.string(),
    chatId: v.id('chats'),
  },
  handler: async (ctx, args) => {
    const user = await isAuth(ctx);
    if (!user)
      throw new ConvexError('You must be logged in to create messages');

    return await ctx.db.insert('messages', {
      ...args,
      userId: user._id,
    });
  },
});
