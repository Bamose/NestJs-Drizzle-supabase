import { relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { token } from './tokenschema';
import { event } from './eventschema';
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  email: text('email').unique().notNull(),
  role: text('roles'),
  member: text('member'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});
export const userRelations = relations(users, ({ many }) => ({
  token: many(token),
}));

export const eventRelations = relations(users, ({ many }) => ({
  event: many(event),
}));
