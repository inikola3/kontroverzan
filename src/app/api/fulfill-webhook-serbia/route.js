import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json()
        console.log('Fulfill Order Payload: ', body)
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('There was an error with a webhook', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}