'use client'
import { useState, useEffect } from 'react'
import { columns } from "../dashboard/columns"
import { OrdersTable } from './OrdersTable'

export function OrdersClient({ data }) {
    const [orders, setOrders] = useState(data)
    const [country, setCountry] = useState('Serbia')

    const handleFetch = async () => {
        try {
            const res = await fetch(`/api/fulfilledOrders?country=${country}`)
            if (!res.ok) throw new Error(`Failed to fetch orders: ${res.statusText}`)

            const newData = await res.json()
            setOrders(newData)
        } catch (error) {
            console.error('Error fetching orders: ', error)
        }
    }

    useEffect(() => {
        handleFetch()
    }, [country])

    return (
        <main className="flex justify-center w-full sm:p-20 p-5 pt-10 sm:ml-[64px]">
            <OrdersTable
                columns={columns}
                data={orders}
                country={country}
                setCountry={setCountry}
                refreshOrders={handleFetch}
            />
        </main>
    )
}