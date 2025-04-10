'use client'
import { useState, useEffect } from "react"
import { columns } from "./columns"
import { DashboardTable } from "./DashboardTable"

export default function DashboardClient({ ordersData }) {
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

    const handleDelete = async (id) => {
        try {
            const response = await fetch('/api/delete-action', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete order')
            }
            fetchOrders()
            console.log('Order deleted')
        } catch (error) {
            console.error('Error fulfilling orders: ', error)
        }
    }

    const columnsFn = columns(handleDelete)

    useEffect(() => {
        fetchOrders()
    }, [country])

    return (
        <main className="flex justify-center w-full sm:p-20 p-5 pt-10 sm:ml-[64px]">
            <DashboardTable
                columns={columnsFn}
                data={orders}
                country={country}
                setCountry={setCountry}
                refreshOrders={fetchOrders}
                loading={loading}
            />
        </main>
    )
}