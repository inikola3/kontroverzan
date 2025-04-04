import { NextResponse } from "next/server"
import { deleteOrders } from "@/lib/queries/deleteOrders"

export async function POST(req) {
    try {
        const body = await req.json()

        if (!body.id) {
            return NextResponse.json({ error: "Missing required field: id" }, { status: 400 });
        }

        await deleteOrders(body.id.toString())

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('There was an error deleting the order', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}