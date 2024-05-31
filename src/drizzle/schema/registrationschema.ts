import { relations, sql } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { event } from './eventschema';

export const registration = pgTable('registration', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  registrationStatus: text('regstrationstatus'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  eventId: integer('eventid'),
});

export const eventRelations = relations(registration, ({ one }) => ({
  event: one(event, {
    fields: [registration.eventId],
    references: [event.id],
    relationName: 'eventregistration',
  }),
}));
