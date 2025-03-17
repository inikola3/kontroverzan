import { getUnfulfilledOrdersByCountry } from "@/lib/queries/getUnfulfilledOrdersByCountry"
import DashboardClient from "./DashboardClient"

export const metadata = {
    title: 'Dashboard'
}

export default async function Dashboard() {
    const ordersData = await getUnfulfilledOrdersByCountry("Serbia")
    return <DashboardClient
        ordersData={ordersData}
    />
}

