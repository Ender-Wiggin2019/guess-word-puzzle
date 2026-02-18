import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  expiresAt: text('expires_at').notNull(),
});

export const challengeResults = sqliteTable('challenge_results', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  challengeId: text('challenge_id').notNull(),
  score: integer('score').notNull(),
  time: integer('time').notNull(),
  difficulty: text('difficulty', { enum: ['easy', 'medium', 'hard'] }).notNull(),
  completedAt: text('completed_at').notNull().$defaultFn(() => new Date().toISOString()),
});
