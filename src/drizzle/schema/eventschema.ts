import { date, pgTable, serial, text, time } from 'drizzle-orm/pg-core';

export const event = pgTable('event', {
  id: serial('id').primaryKey(),
  eventName: text('eventname'),
  description: text('description'),
  date: date('date'),
  time: time('time'),
  location: text('location'),
  organisedBy: text('organisedBy'),
});
