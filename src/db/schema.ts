import { pgTable, serial, varchar, boolean, timestamp, integer, text } from "drizzle-orm/pg-core";

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
    price: integer("price").notNull(),
    weight: integer("weight").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});