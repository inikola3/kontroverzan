import { getFulfilledOrdersByCountry } from "@/lib/queries/getFulfilledOrdersByCountry"
import { NextResponse } from "next/server"

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const country = searchParams.get('country')

    if (!country) {
        return NextResponse.json({ error: 'Failed to get country' }, { status: 400 })
    }

    try {
        const data = await getFulfilledOrdersByCountry(country)
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }
}