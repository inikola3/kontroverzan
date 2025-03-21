import { NextResponse } from "next/server"
import { fulfillOrders } from "@/lib/queries/fulfillOrders"

export async function POST(req) {
    try {
        const body = await req.json()

        if (!body.id) {
            return NextResponse.json({ error: "Missing required field: id" }, { status: 400 });
        }

        const id = body.id.toString()
        await fulfillOrders(id)

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('There was an error fulfilling order', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}