import { db } from '@/db'
import { orders, orderItems } from '@/db/schema'
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
    line_items?: {
        quantity?: number,
        title?: string,
        price?: string,
        total_discount?: string
    }[]
}

type OrderInsertType = InferInsertModel<typeof orders>
type OrderItemInsertType = InferInsertModel<typeof orderItems>

export async function ordersCreateBosnia(orderPayload: payloadType) {
    try {
        console.error('📦 Creating order for ID:', orderPayload.id)
        const [newOrder] = await db.insert(orders).values(
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
        ).returning({ orderId: orders.orderId })

        console.error('🟢 Order inserted:', newOrder)

        const orderDbKey = newOrder.orderId
        console.error("Will insert items for orderId =", orderDbKey)
        const itemsToInsert = orderPayload.line_items.map(item => ({
            orderId: orderDbKey,
            quantity: item.quantity ?? 0,
            name: item.title ?? 'unknown',
            price: parseFloat(item.price ?? '0').toFixed(2),
            discount: parseFloat(item.total_discount ?? '0').toFixed(2)
        } as OrderItemInsertType))

        console.error('📦 Inserting items:', itemsToInsert)

        await db.insert(orderItems).values(itemsToInsert)

        console.error('✅ Items inserted successfully')

        return newOrder
    } catch (error) {
        console.error('Failed to create order from webhook', error)
        throw new Error('Failed to insert order')
    }
}