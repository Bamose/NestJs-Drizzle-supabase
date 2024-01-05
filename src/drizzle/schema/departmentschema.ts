import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const department = pgTable('department', {
  id: serial('id').primaryKey(),
  name: text('name'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});
