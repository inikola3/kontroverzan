import { db } from '@/db'
import { orders } from '@/db/schema'
import { InferInsertModel } from 'drizzle-orm'

interface payloadType {
    id: number,
    shipping_address?: {
        first_name?: string,
        last_name?: string,
        address1?: string,
        address2?: string,
        city?: string,
        zip?: string,
        phone?: string
    },
    total_price: string,
    total_discounts: string,
    total_weight: number,
}

type OrderInsertType = InferInsertModel<typeof orders>

export async function ordersCreateBosnia(orderPayload: payloadType) {
    try {
        const newOrder = await db.insert(orders).values(
            {
                orderId: orderPayload.id.toString(),
                country: 'BIH',
                orderStatus: 'unfulfilled',
                customerName: `${orderPayload.shipping_address?.first_name ?? ''} ${orderPayload.shipping_address?.last_name ?? ''}`.trim(),
                street: orderPayload.shipping_address?.address1 ?? 'unknown',
                city: orderPayload.shipping_address?.city ?? 'unknown',
                zip: orderPayload.shipping_address?.zip ?? '000000',
                phoneNumber: orderPayload.shipping_address?.phone ?? 'NA',
                price: parseFloat(orderPayload.total_price).toFixed(2),
                weight: orderPayload.total_weight,
                notes: orderPayload.shipping_address?.address2 ?? null,
                totalDiscounts: parseFloat(orderPayload.total_discounts).toFixed(2),
            } as OrderInsertType
        )
        return newOrder
    } catch (error) {
        console.error('Failed to create order from webhook', error)
        throw new Error('Failed to insert order')
    }
}