import { relations, sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { token } from './tokenschema';
import { event } from './eventschema';
export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
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
