import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const profile = pgTable('profile', {
  id: serial('id').primaryKey(),
  bio: text('bio'),
  createdAt: timestamp('timestamp').defaultNow(),
  updatedAt: timestamp('timestamp').defaultNow(),
});
