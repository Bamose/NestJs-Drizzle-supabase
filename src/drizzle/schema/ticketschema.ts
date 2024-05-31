import { sql } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const ticket = pgTable('ticket', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  eventId: text('eventId'),
  tickettype: text('ticketType'),
  fullName: text('fullName'),
  quantity: integer('quantity'),
  price: integer('price'),
  salesStartDate: text('salesStartDate'),
  salesStartTime: text('salesStartTime'),
  salesEndDate: text('salesEndDate'),
  salesEndTime: text('salesEndTime'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

/* 
export const ticketRelations = relations(ticket, ({ one }) => ({
  user: one(users, {
    fields: [ticket.ticketId],
    references: [users.id],
  }),
}));

export const registrationRelations = relations(event, ({ many }) => ({
  eventregistration: many(registration, { relationName: 'eventregistration' }),
}));
 */
