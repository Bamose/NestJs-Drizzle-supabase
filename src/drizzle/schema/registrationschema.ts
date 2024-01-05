import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { event } from './eventschema';
import { member } from './memberschema';
export const registration = pgTable('registration', {
  id: serial('id').primaryKey(),
  registrationStatus: text('regstrationstatus'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  eventId: integer('eventid'),
  memberId: integer('memberid'),
});

export const eventRelations = relations(registration, ({ one }) => ({
  event: one(event, {
    fields: [registration.eventId],
    references: [event.id],
  }),
}));
export const memberRelations = relations(registration, ({ one }) => ({
  event: one(member, {
    fields: [registration.memberId],
    references: [member.id],
  }),
}));
