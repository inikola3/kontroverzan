import { ordersCreateBosnia } from "@/lib/queries/ordersCreateBosnia"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const body = await req.json()
        await ordersCreateBosnia(body)

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        console.error('There was an error creating an order from webhook')
        return NextResponse.json({ success: false }, { status: 500 })
    }
}