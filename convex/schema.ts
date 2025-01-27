import { defineSchema } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { Table } from 'convex-helpers/server';
import { v } from 'convex/values';

export const Users = Table('users', {
  fullName: v.optional(v.string()),
  email: v.string(),
  emailVerificationTime: v.optional(v.number()),
  image: v.optional(v.string()),
});

export const Chats = Table('chats', {
  prompt: v.optional(v.string()),
  fileData: v.optional(v.any()),
  userId: v.id('users'),
});

export const Messages = Table('messages', {
  role: v.union(v.literal('user'), v.literal('model')),
  content: v.string(),
  chatId: v.id('chats'),
  userId: v.id('users'),
});

const schema = defineSchema({
  ...authTables,
  users: Users.table.index('email', ['email']),
  chats: Chats.table.index('userId', ['userId']),
  messages: Messages.table
    .index('chatId', ['chatId'])
    .index('userId', ['userId']),
});

export default schema;
