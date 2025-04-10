import { NextResponse } from "next/server"
import { deleteOrders } from "@/lib/queries/deleteOrders"

export async function DELETE(req) {
    const { id } = await req.json()

    try {
        await deleteOrders(id.toString())
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error("Failed to delete: ", error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}