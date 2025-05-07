// import { getUnfulfilledOrdersByCountry } from "@/lib/queries/getUnfulfilledOrdersByCountry"
import { getOrdersWithItems } from "@/lib/queries/getOrdersWithItems"
import FinancialsClient from "./FinancialsClient"

export const metadata = {
    title: 'Financials'
}
export default async function Financials() {
    const ordersData = await getOrdersWithItems()
    return <FinancialsClient
        ordersData={ordersData}
    />
} 