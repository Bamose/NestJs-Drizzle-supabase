import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from './userschema';
import { ticket } from './ticketschema';

export const event = pgTable('event', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  userId: text('userId').notNull(),
  eventName: text('eventName'),
  active: boolean('active'),
  description: jsonb('description'),
  summary: text('summary'),
  date: text('date'),
  time: text('time'),
  image: text('image'),
  location: text('location'),
  organisedBy: text('organisedBy'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

export const eventRelations = relations(event, ({ one }) => ({
  user: one(users, {
    fields: [event.userId],
    references: [users.id],
  }),
}));

export const ticketRelations = relations(event, ({ one }) => ({
  eventticket: one(ticket),
}));
