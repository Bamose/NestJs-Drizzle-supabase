import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const member = pgTable('member', {
  id: serial('id').primaryKey(),
  firstName: text('firstname'),
  lastName: text('lastName'),
  email: text('emaol').notNull(),
  phoneNumber: text('phoheNumber'),
  createdAt: timestamp('timestamp').defaultNow(),
  updatedAt: timestamp('timestamp').defaultNow(),
  departmentName: text('departmentName'),
});
