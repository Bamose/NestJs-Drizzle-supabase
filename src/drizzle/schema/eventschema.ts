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
import { register } from './registerschema';

export const event = pgTable('event', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  userid: text('userid').notNull(),
  eventname: text('eventname'),
  active: boolean('active'),
  description: jsonb('description'),
  summary: text('summary'),
  date: text('date'),
  time: text('time'),
  image: text('image'),
  location: text('location'),
  organisedby: text('organisedby'),
  createdat: timestamp('createdat').defaultNow(),
  updatedat: timestamp('updatedat').defaultNow(),
});

export const eventRelations = relations(event, ({ one }) => ({
  user: one(users, {
    fields: [event.userid],
    references: [users.id],
  }),
}));

export const ticketRelations = relations(event, ({ one }) => ({
  eventticket: one(ticket),
}));
export const registerRelations = relations(event, ({ one }) => ({
  eventregister: one(register),
}));
