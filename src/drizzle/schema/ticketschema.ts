import { relations, sql } from 'drizzle-orm';
import {
  date,
  integer,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from './userschema';
import { event } from './eventschema';

export const ticket = pgTable('ticket', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  eventId: text('eventId').references(() => event.id),
  userId: text('userId'),
  ticketType: text('ticketType'),
  fullName: text('fullName'),
  quantity: integer('quantity'),
  price: integer('price'),
  salesStartDate: date('salesStartDate'),
  salesStartTime: time('salesStartTime'),
  salesEndDate: date('salesEndDate'),
  salesEndTime: time('salesEndTime'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

export const ticketRelations = relations(ticket, ({ one }) => ({
  user: one(users, {
    fields: [ticket.userId],
    references: [users.id],
  }),
}));
