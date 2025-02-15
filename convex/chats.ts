import { ConvexError, v } from 'convex/values';
import { omit } from 'convex-helpers';
import { paginationOptsValidator } from 'convex/server';

import { mutation, MutationCtx, query, QueryCtx } from './_generated/server';
import { isAuth } from './helper';
import { Chats, Messages } from './schema';
import { Id } from './_generated/dataModel';

const chatBelongsToUser = async (
  ctx: QueryCtx | MutationCtx,
  chatId: Id<'chats'>,
  userId: Id<'users'>
) => {
  const chat = await ctx.db.get(chatId);
  if (chat?.userId !== userId)
    throw new ConvexError('This chat does not belong to this user.');
};

export const getChat = query({
  args: {
    chatId: v.id('chats'),
  },
  handler: async (ctx, { chatId }) => {
    const user = await isAuth(ctx);
    const chat = await ctx.db.get(chatId);

    if (chat?.userId !== user?._id) return null;
    return chat;
  },
});

export const getUserChats = query({
  args: {},
  handler: async ctx => {
    const user = await isAuth(ctx);
    if (!user)
      throw new ConvexError('You must be logged in to access your chats');

    return await ctx.db
      .query('chats')
      .withIndex('userId', q => q.eq('userId', user?._id))
      .order('desc')
      .take(15);
  },
});

export const getAllUserChatsPaginated = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, { paginationOpts }) => {
    const user = await isAuth(ctx);
    if (!user)
      throw new ConvexError('You must be logged in to access your chats');

    return await ctx.db
      .query('chats')
      .withIndex('userId', q => q.eq('userId', user._id))
      .order('desc')
      .paginate(paginationOpts);
  },
});

export const createChat = mutation({
  args: {
    prompt: v.string(),
    image: v.optional(
      v.object({
        storageId: v.id('_storage'),
        name: v.string(),
        size: v.number(),
      })
    ),
    message: v.object({
      role: Messages.withoutSystemFields.role,
      content: v.string(),
    }),
  },
  handler: async (ctx, { prompt, image, message: { role, content } }) => {
    const user = await isAuth(ctx);
    if (!user) throw new ConvexError('You must be logged in to create a chat');

    const chatId = await ctx.db.insert('chats', {
      prompt,
      userId: user._id,
    });

    await ctx.db.insert('messages', {
      role,
      content,
      image,
      chatId,
      userId: user._id,
    });

    return chatId;
  },
});

export const updateChat = mutation({
  args: {
    chatId: v.id('chats'),
    chatData: v.object(omit(Chats.withoutSystemFields, ['userId'])),
  },
  handler: async (ctx, { chatId, chatData }) => {
    const user = await isAuth(ctx);
    if (!user) throw new ConvexError('You must be logged in to update a chat');

    chatBelongsToUser(ctx, chatId, user?._id);

    await ctx.db.patch(chatId, { ...chatData });
  },
});

export const deleteChat = mutation({
  args: { chatId: v.id('chats') },
  handler: async (ctx, { chatId }) => {
    const user = await isAuth(ctx);
    if (!user) throw new ConvexError('You must be logged in to update a chat');
    chatBelongsToUser(ctx, chatId, user?._id);

    const messagesToDelete = await ctx.db
      .query('messages')
      .withIndex('chatId', q => q.eq('chatId', chatId))
      .collect();

    await ctx.db.delete(chatId);
    await Promise.all(
      messagesToDelete.map(message => ctx.db.delete(message._id))
    );
  },
});

export const deleteAllUserChats = mutation({
  args: {},
  handler: async ctx => {
    const user = await isAuth(ctx);
    if (!user)
      throw new ConvexError('You must be logged in to delete your chats');

    const chats = await ctx.db
      .query('chats')
      .withIndex('userId', q => q.eq('userId', user._id))
      .collect();

    const messages = await ctx.db
      .query('messages')
      .withIndex('userId', q => q.eq('userId', user._id))
      .collect();

    await Promise.all([
      ...messages.map(message => ctx.db.delete(message._id)),
      ...chats.map(chat => ctx.db.delete(chat._id)),
    ]);
  },
});
