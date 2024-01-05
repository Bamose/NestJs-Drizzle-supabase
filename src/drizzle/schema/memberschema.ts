import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './userschema';
import { registration } from './registrationschema';
import { profile } from './profileschema';
export const member = pgTable('member', {
  id: serial('id').primaryKey(),
  firstName: text('firstname'),
  lastName: text('lastName'),
  email: text('emaol').notNull(),
  phoneNumber: text('phoheNumber'),
  createdAt: timestamp('timestamp').defaultNow(),
  updatedAt: timestamp('timestamp').defaultNow(),
  departmentName: text('departmentName'),
  userId: integer('userid'),
});

export const userRelation = relations(member, ({ one }) => ({
  user: one(users, {
    fields: [member.userId],
    references: [users.id],
  }),
}));

export const registrationRelation = relations(member, ({ many }) => ({
  member: many(registration),
}));

export const profileRelations = relations(member, ({ one }) => ({
  profile: one(profile),
}));
