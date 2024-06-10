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
  eventid: text('eventid').references(() => event.id),
  userid: text('userid'),
  tickettype: text('tickettype'),
  fullname: text('fullname'),
  quantity: integer('quantity'),
  price: integer('price'),
  salesstartdate: date('salesstartdate'),
  salesstarttime: time('salesstarttime'),
  salesenddate: date('salesenddate'),
  salesendtime: time('salesendtime'),
  createdat: timestamp('createdat').defaultNow(),
  updatedat: timestamp('updatedat').defaultNow(),
});

export const ticketRelations = relations(ticket, ({ one }) => ({
  user: one(users, {
    fields: [ticket.userid],
    references: [users.id],
  }),
}));
