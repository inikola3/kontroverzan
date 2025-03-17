import { db } from "@/db"
import { orders } from "@/db/schema"
import { and, eq } from "drizzle-orm"

export async function getUnfulfilledOrdersByCountry(country: string) {
    const unfulfilledOrdersByCountry = await db.select()
        .from(orders)
        .where(
            and(
                eq(orders.orderStatus, "unfulfilled"),
                eq(orders.country, country),
            )
        )
    return unfulfilledOrdersByCountry
}