import { ConvexError, v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { Messages } from './schema';
import { isAuth } from './helper';
import { Id } from './_generated/dataModel';

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
      messages.map(async message => {
        const imageUrl = message.image
          ? await ctx.storage.getUrl(message.image.storageId as Id<'_storage'>)
          : undefined;

        return {
          ...message,
          image: {
            url: imageUrl,
            name: message.image?.name,
            size: message.image?.size,
          },
          user: message.role === 'user' ? user.fullName : undefined,
          userImage: message.role === 'user' ? user.image : undefined,
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
    image: v.optional(
      v.object({
        storageId: v.id('_storage'),
        name: v.string(),
        size: v.number(),
      })
    ),
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
