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
  prompt: v.string(),
  messages: v.any(), //JSON DATA
  fileData: v.optional(v.any()),
  userId: v.id('users'),
});

const schema = defineSchema({
  ...authTables,
  users: Users.table.index('email', ['email']),
});

export default schema;
