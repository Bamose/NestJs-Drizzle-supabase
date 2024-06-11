import { relations, sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './userschema';
import { event } from './eventschema';

export const register = pgTable('register', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  userid: text('userid').notNull(),
  eventid: text('eventid').references(() => event.id),
  fullname: text('fullname'),
  createdat: timestamp('createdat').defaultNow(),
  updatedat: timestamp('updatedat').defaultNow(),
});

export const registerRelations = relations(register, ({ one }) => ({
  user: one(users, {
    fields: [register.userid],
    references: [users.id],
  }),
}));
