import { InferModel, relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  smallint,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const rolesEnum = pgEnum('roles', ['ADMIN', 'USER']);
export const itemTypeEnum = pgEnum('types', ['FOOD', 'MATERIAL', 'OTHER']);

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name'),
});

// export const itemsRelations = relations(item, ({ many }) => ({
// 	itemsToInventory: many(itemsToInventory),
// }));
// export const inventoryRelations = relations(inventory, ({ many }) => ({
// 	itemsToInventory: many(itemsToInventory),
// }));

// export const itemsToInventory = pgTable('items_to_inventory', {
//     id: serial('id').notNull(),
//         quantity: smallint('quantity'),
// 		itemId: integer('item_id').notNull().references(() => item.id),
// 		inventoryId: integer('inventory_id').notNull().references(() => inventory.id),
// 	}
// );

// export const itemsToInventoryRelations = relations(itemsToInventory, ({ one,many }) => ({
// 	inventory: many(inventory, {
// 		fields: [itemsToInventory.inventoryId],
// 		references: [inventory.id],
// 	}),
// 	item: one(item, {
// 		fields: [itemsToInventory.itemId],
// 		references: [item.id],
// 	}),
// }));

export type User = InferModel<typeof user>; // return type when queried
export type NewUser = InferModel<typeof user, 'insert'>; // insert type
// export type ItemsToInventory = InferModel<typeof itemsToInventory>; // return type when queried
// export type NewMItemsToInventory = InferModel<typeof itemsToInventory,"insert">; // return type when queried
