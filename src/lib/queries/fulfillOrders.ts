import { db } from '@/db'
import { orders } from '@/db/schema'
import { eq } from "drizzle-orm"

export async function fulfillOrders(id: string) {
    const fulfillOrders = await db.update(orders)
        .set({ orderStatus: 'fulfilled' })
        .where(
            eq(orders.orderId, id)
        )
    return fulfillOrders
}