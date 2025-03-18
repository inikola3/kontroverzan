import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const body = await req.json()
        console.log('Deleted Order ID: ', body.id)
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('There was an error in order deletion webhook', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}