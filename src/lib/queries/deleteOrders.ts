import { db } from "@/db"
import { orders } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function deleteOrders(id: string) {
    try {
        const deleteOrders = await db.delete(orders)
            .where(
                eq(orders.orderId, id)
            )
        return deleteOrders
    } catch (error) {
        console.error('Failed to delete order from webhook', error)
        throw new Error('Failed to delete order')
    }
}