'use client'
import { useState, useEffect } from "react"
import { columns } from "./columns"
import { FinancialsTable } from "./FinancialsTable"

export default function FinancialsClient({ ordersData }) {
    const [orders, setOrders] = useState(ordersData)
    const [country, setCountry] = useState('Serbia')
    const [loading, setLoading] = useState(false)

    async function fetchOrders() {
        setLoading(true)
        try {
            const res = await fetch(`/api/orders?country=${country}`) // api route
            if (!res.ok) throw new Error(`Failed to fetch orders: ${res.statusText}`)

            const data = await res.json()
            setOrders(data)
        } catch (error) {
            console.error('Error fetching orders: ', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex justify-center w-full sm:p-20 p-5 pt-10 sm:ml-[64px]">
            <FinancialsTable
                columns={columns}
                data={orders}
                country={country}
                setCountry={setCountry}
                refreshOrders={fetchOrders}
                loading={loading}
            />
        </main>
    )
}