import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  time,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './userschema';

export const token = pgTable('token', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('timestamp').defaultNow(),
  updatedAt: timestamp('timestamp').defaultNow(),
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
