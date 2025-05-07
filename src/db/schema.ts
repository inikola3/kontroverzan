import { pgTable, serial, varchar, decimal, timestamp, integer, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"

export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    orderId: varchar("order_id", { length: 255 }).unique().notNull(),
    country: text("country").notNull(),
    orderStatus: text("order_status").notNull(),
    customerName: varchar("customer_name", { length: 255 }).notNull(),
    street: varchar("street").notNull(),
    city: varchar("city", { length: 100 }).notNull(),
    zip: varchar("zip", { length: 20 }),
    phoneNumber: varchar("phone_number", { length: 20 }),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    weight: integer("weight").notNull(),
    notes: text("notes"),
    totalDiscounts: decimal("total_discounts", { precision: 10, scale: 2 }).notNull().default("0.00"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export const orderItems = pgTable("order_items", {
    id: serial("id").primaryKey(),
    orderId: varchar("order_id").references(() => orders.orderId),
    quantity: integer("quantity").notNull(),
    name: varchar("name").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    discount: decimal("discount", { precision: 10, scale: 2 })
});

export const ordersRelations = relations(orders,
    ({ many }) => ({
        items: many(orderItems)
    })
);

export const itemsRelations = relations(orderItems,
    ({ one }) => ({
        order: one(orders, {
            fields: [orderItems.orderId],
            references: [orders.orderId]
        })
    })
);