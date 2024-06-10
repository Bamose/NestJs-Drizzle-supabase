import { relations, sql } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './userschema';

export const token = pgTable('token', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  createdat: timestamp('createdat').defaultNow(),
  updatedat: timestamp('updatedat').defaultNow(),
  type: text('type').notNull(),
  emailtoken: text('emailtoken').notNull(),
  valid: boolean('valid').default(true).notNull(),
  expiration: timestamp('expiration').notNull(),
  userid: text('userid').notNull(),
});

export const tokenRelations = relations(token, ({ one }) => ({
  user: one(users, {
    fields: [token.userid],
    references: [users.id],
  }),
}));
