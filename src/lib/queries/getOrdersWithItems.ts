import { db } from "@/db"
import { orders } from "@/db/schema"
import { eq, and, asc } from "drizzle-orm"

export async function getOrdersWithItems() {
    const ordersWithItems = await db.query.orders.findMany({
        where: and(
            eq(orders.orderStatus, "unfulfilled"),
            eq(orders.country, "BIH")
        ),
        with: {
            items: true
        },
        orderBy: (orders, { asc }) => [asc(orders.createdAt)]
    })
    return ordersWithItems
}