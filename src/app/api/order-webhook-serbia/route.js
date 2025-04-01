import { NextResponse } from "next/server"
import { ordersCreateSerbia } from "@/lib/queries/ordersCreateSerbia"

export async function POST(req) {
    try {
        const body = await req.json()
        //console.log('Webhook Payload Serbia: ', body)
        await ordersCreateSerbia(body)
        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        console.error('There was an issue with the webhook data', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}