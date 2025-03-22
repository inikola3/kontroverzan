import { pgTable, serial, varchar, decimal, timestamp, integer, text } from "drizzle-orm/pg-core";

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