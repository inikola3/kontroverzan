import * as XLSX from 'xlsx'
import { toast } from 'sonner'

export async function exportExcel(data, country) {
    if (!data || data.length === 0) {
        toast.error("No data available to download.", {
            description: "Please select data from the table.",
        })
        return
    }

    const idArray = data.map(row => row.id)
    const status = data[0].status

    const dataCleaned = country === 'Serbia' ?
        data.map(({ id, status, ...rest }) => ({
            ...rest,
            ['Račun za otkup']: '265-2050310002802-85'
        }))
        : data.map(({ id, status, ...rest }) => rest)

    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()

    const date = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`

    const ws = XLSX.utils.json_to_sheet(dataCleaned)

    ws['!cols'] = Object.keys(dataCleaned[0]).map(key => ({
        wch: Math.max(10, key.length + 2, ...dataCleaned.map(row => row[key]?.toString().length || 0))
    }))

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Orders")
    XLSX.writeFile(wb, `${country === 'BIH' ? 'BiH ' : ''}Kontroverzan ${date}.xlsx`)

    toast.success('Download started!',
        { description: 'Your Excel file is being saved.' }
    )

    // if (status === 'unfulfilled') {
    //     try {
    //         const response = await fetch('/api/fulfillOrders', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ idArray })
    //         })
    //         const result = await response.json()
    //         if (!response.ok) {
    //             throw new Error(result.error || 'Failed to fulfill orders')
    //         }
    //         console.log('Orders fulfilled successfully', result)
    //     } catch (error) {
    //         console.error('Error fulfilling orders: ', error)
    //     }
    // }
}