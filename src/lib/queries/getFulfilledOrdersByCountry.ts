import { db } from '@/db'
import { orders } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

export async function getFulfilledOrdersByCountry(country: string) {
    const FulfilledOrdersByCountry = await db.select()
        .from(orders)
        .where(
            and(
                eq(orders.orderStatus, 'fulfilled'),
                eq(orders.country, country)
            )
        )
    return FulfilledOrdersByCountry
}