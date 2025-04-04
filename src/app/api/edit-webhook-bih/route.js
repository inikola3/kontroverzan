import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const body = await req.json()
        console.log('Edit webhook payload: ', body)

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('Failed to edit order', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}