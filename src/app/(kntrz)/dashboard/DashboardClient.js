'use client'
import { useState, useEffect } from "react"
import { columns } from "./columns"
import { DashboardTable } from "./DashboardTable"

export default function DashboardClient({ ordersData }) {
    const [orders, setOrders] = useState(ordersData)
    const [country, setCountry] = useState('Serbia')

    async function fetchOrders() {
        try {
            const res = await fetch(`/api/orders?country=${country}`) // api route
            if (!res.ok) throw new Error(`Failed to fetch orders: ${res.statusText}`)

            const data = await res.json()
            setOrders(data)
        } catch (error) {
            console.error('Error fetching orders: ', error)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [country])

    return (
        <main className="flex justify-center w-full sm:p-20 p-5 pt-10 sm:ml-[64px]">
            <DashboardTable
                columns={columns}
                data={orders}
                country={country}
                setCountry={setCountry}
                refreshOrders={fetchOrders}
            />
        </main>
    )
}