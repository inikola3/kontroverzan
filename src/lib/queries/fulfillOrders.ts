import { db } from '@/db'
import { orders } from '@/db/schema'
import { inArray } from "drizzle-orm"

export async function fulfillOrders(idArray: number[]) {
    const fulfillOrders = await db.update(orders)
        .set({ orderStatus: 'fulfilled' })
        .where(
            inArray(orders.id, idArray)
        )
    return fulfillOrders
}