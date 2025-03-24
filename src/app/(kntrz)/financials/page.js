import { getUnfulfilledOrdersByCountry } from "@/lib/queries/getUnfulfilledOrdersByCountry"
import FinancialsClient from "./FinancialsClient"

export const metadata = {
    title: 'Financials'
}
export default async function Financials() {
    const ordersData = await getUnfulfilledOrdersByCountry("Serbia")
    return <FinancialsClient
        ordersData={ordersData}
    />
} 