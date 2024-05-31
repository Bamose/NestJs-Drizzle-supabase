import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from './userschema';

export const token = pgTable('token', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
  type: text('otp/api'),
  emailToken: text('emailtoken').notNull(),
  valid: boolean('valid').default(true),
  expiration: time('expiration'),
  userId: integer('userid'),
});

export const tokenRelations = relations(token, ({ one }) => ({
  user: one(users, {
    fields: [token.userId],
    references: [users.id],
  }),
}));
