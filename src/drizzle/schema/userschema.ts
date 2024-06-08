import { relations, sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { token } from './tokenschema';
import { event } from './eventschema';
import { ticket } from './ticketschema';
export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  userName: text('userName').notNull(),
  password: text('password').notNull(),
  email: text('email').unique().notNull(),
  role: text('roles'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  token: many(token),
}));

export const eventRelations = relations(users, ({ many }) => ({
  event: many(event),
}));

export const ticketRelations = relations(users, ({ many }) => ({
  event: many(ticket),
}));
