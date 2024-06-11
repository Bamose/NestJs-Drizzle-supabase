import { relations, sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { token } from './tokenschema';
import { event } from './eventschema';
import { ticket } from './ticketschema';
import { register } from './registerschema';
export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  email: text('email').unique().notNull(),
  role: text('role'),
  createdAt: timestamp('createdat').defaultNow(),
  updatedAt: timestamp('updatedat').defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  token: many(token),
}));
export const regisRelations = relations(users, ({ many }) => ({
  token: many(register),
}));

export const eventRelations = relations(users, ({ many }) => ({
  event: many(event),
}));

export const ticketRelations = relations(users, ({ many }) => ({
  event: many(ticket),
}));
