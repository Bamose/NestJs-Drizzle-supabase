import { relations, sql } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './userschema';

export const token = pgTable('token', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  type: text('type').notNull(),
  emailToken: text('emailtoken').notNull(),
  valid: boolean('valid').default(true).notNull(),
  expiration: timestamp('expiration').notNull(),
  userId: text('userid').notNull(),
});

export const tokenRelations = relations(token, ({ one }) => ({
  user: one(users, {
    fields: [token.userId],
    references: [users.id],
  }),
}));
