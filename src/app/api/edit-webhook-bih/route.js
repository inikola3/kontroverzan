import { NextResponse } from "next/server"
import { editOrders } from "@/lib/queries/editOrders"

export async function POST(req) {
    try {
        const body = await req.json()

        await editOrders(body)

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('Failed to edit order', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}