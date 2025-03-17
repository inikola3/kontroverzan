import { fulfillOrders } from '@/lib/queries/fulfillOrders'
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const { idArray } = await req.json()
        await fulfillOrders(idArray)
        return NextResponse.json({ success: true, message: "Orders fulfilled successfully" })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}