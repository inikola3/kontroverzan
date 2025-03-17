import { NextResponse } from 'next/server'
import { getUnfulfilledOrdersByCountry } from '@/lib/queries/getUnfulfilledOrdersByCountry'

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const country = searchParams.get('country')

    if (!country) {
        return NextResponse.json({ error: 'Country failed' }, { status: 400 })
    }

    try {
        const orders = await getUnfulfilledOrdersByCountry(country)
        return NextResponse.json(orders)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }
}