import { relations } from 'drizzle-orm';
import {
  date,
  integer,
  pgTable,
  serial,
  text,
  time,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './userschema';
import { registration } from './registrationschema';

export const event = pgTable('event', {
  id: serial('id').primaryKey(),
  eventName: text('eventname'),
  description: text('description'),
  date: date('date'),
  time: time('time'),
  location: text('location'),
  organisedBy: text('organisedBy'),
  userId: integer('userId'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

export const eventRelations = relations(event, ({ one }) => ({
  user: one(users, {
    fields: [event.userId],
    references: [users.id],
  }),
}));

export const registrationRelations = relations(event, ({ many }) => ({
  registration: many(registration),
}));
