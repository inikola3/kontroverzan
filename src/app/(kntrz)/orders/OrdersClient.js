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
            handleFetch()
            console.log('Order deleted')
        } catch (error) {
            console.error('Error fulfilling orders: ', error)
        }
    }

    const columnsFn = columns(handleDelete)

    useEffect(() => {
        handleFetch()
    }, [country])

    return (
        <main className="flex justify-center w-full sm:p-20 p-5 pt-10 sm:ml-[64px]">
            <OrdersTable
                columns={columnsFn}
                data={orders}
                country={country}
                setCountry={setCountry}
                refreshOrders={handleFetch}
            />
        </main>
    )
}