import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const Registration = pgTable('registration', {
  id: serial('id').primaryKey(),
  registrationStatus: text('regstatus'),
  createdAt: timestamp('timestamp').defaultNow(),
  updatedAt: timestamp('timestamp').defaultNow(),
});
