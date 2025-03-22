import { getUnfulfilledOrdersByCountry } from "@/lib/queries/getUnfulfilledOrdersByCountry"
import FinancialsClient from "./FinancialsClient"

export const metadata = {
    title: 'Financial Reports'
}
export default async function Financials() {
    const ordersData = await getUnfulfilledOrdersByCountry("Serbia")
    return <FinancialsClient
        ordersData={ordersData}
    />
} 