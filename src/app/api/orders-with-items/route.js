import { NextResponse } from 'next/server'
import { getOrdersWithItems } from '@/lib/queries/getOrdersWithItems'

export async function GET() {
    // const { searchParams } = new URL(req.url)
    // const country = searchParams.get('country')

    // if (!country) {
    //     return NextResponse.json({ error: 'Country failed' }, { status: 400 })
    // }

    try {
        const orders = await getOrdersWithItems()
        return NextResponse.json(orders)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }
}