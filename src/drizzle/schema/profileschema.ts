import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { member } from './memberschema';

export const profile = pgTable('profile', {
  id: serial('id').primaryKey(),
  bio: text('bio'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  memberId: integer('memberid').references(() => member.id),
});
