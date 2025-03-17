import { getFulfilledOrdersByCountry } from '@/lib/queries/getFulfilledOrdersByCountry'
import { OrdersClient } from './OrdersClient'

export const metadata = {
    title: 'Orders'
}


export default async function Orders() {
    const data = await getFulfilledOrdersByCountry("Serbia")
    return (
        <OrdersClient data={data} />
    )
}