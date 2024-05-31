import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

import { sql } from 'drizzle-orm';

export const profile = pgTable('profile', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .notNull(),
  bio: text('bio'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});
