import * as XLSX from 'xlsx'
import { toast } from 'sonner'

export async function exportExcel(data, identifier) {
    if (!data || data.length === 0) {
        toast.error("No data available to download.", {
            description: "Please select data from the table.",
        })
        return
    }
    function formatDate(date) {
        const dd = String(date.getDate()).padStart(2, '0')
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const yyyy = date.getFullYear()
        const hh = String(date.getHours()).padStart(2, '0')
        const min = String(date.getMinutes()).padStart(2, '0')
        return `${dd}.${mm}.${yyyy} ${hh}:${min}`
    }
    const totalDailyDiscount = identifier === 'niv' ?
        data.reduce((sum, row) => sum + (typeof row.Popust === 'number' ? row.Popust : 0), 0)
        : 0

    let ws

    if (identifier === 'niv') {
        const metaRows = [['KONTROVERZAN Dajana Stojić s.p. Bijeljina'], ['Karađorđeva 74, Dvorovi, Bijeljina'], ['JIB: 4513853650007 / PDV BROJ: 513853650007'], [''], ['        *** NIVELACIJE ***'], ['']]

        const uniqueDates = data[0]?.uniqueDates || ''
        const datesData = [`Datum: ${uniqueDates.toString()}`, 'Objekat: KONTROVERZAN Dajana Stojić SP']

        const headers = ['Red. broj', 'Kupac', 'Vrijeme porudzbine', 'Naziv robe', 'Jedinica mjere', 'Nivelisana kolicina', 'Cijena stara', 'Cijena nova', 'Vrijednost stara', 'Vrijednost nova', 'Nivelisana vrijednost']

        const worksheetData = [...metaRows, datesData, headers]

        let orderIndex = 1
        let orderTotalBeforeDiscount = 0
        let orderTotalAfterDiscount = 0
        let totalDiff = 0

        data.forEach(order => {
            const { id, name, time, items } = order

            items.forEach((item, index) => {
                const discountedPrice = Number(item.price - (item.discount || 0)).toFixed(2)
                const totalPrice = Number(item.price * item.quantity).toFixed(2)
                const totalDiscountedPrice = Number(discountedPrice * item.quantity).toFixed(2)
                const diff = Number(-(totalPrice - totalDiscountedPrice)).toFixed(2)

                orderTotalBeforeDiscount += Number(totalPrice)
                orderTotalAfterDiscount += Number(totalDiscountedPrice)
                totalDiff += Number(diff)

                const kom = 'Kom'
                const row = [
                    // index === 0 ? id : '',
                    index === 0 ? orderIndex : '',
                    index === 0 ? name : '',
                    index === 0 ? formatDate(new Date(time)) : '',
                    item.name,
                    kom,
                    item.quantity,
                    Number(item.price).toFixed(2),
                    Number(discountedPrice),
                    Number(totalPrice),
                    Number(totalDiscountedPrice),
                    Number(diff)
                ]
                worksheetData.push(row)
            })
            orderIndex++
        })

        const totals = ['', '', '', '', '', '', '', 'Ukupno:', orderTotalBeforeDiscount, orderTotalAfterDiscount, totalDiff]
        worksheetData.push([''])
        worksheetData.push(totals)
        ws = XLSX.utils.aoa_to_sheet(worksheetData)

        ws['!cols'] = headers.map((header, colIdx) => ({
            wch: Math.max(
                10,
                header.length + 2,
                ...worksheetData
                    .slice(metaRows.length)   // ← start at index 6, include datesData
                    .map(row => (row[colIdx]?.toString().length || 0))
            )
        }));


        // ws['!cols'][0] = { wch: 30 }
    } else {
        const dataCleaned = identifier === 'Serbia' ?
            data.map(({ id, ...rest }) => ({
                ...rest,
                ['Broj žiro računa']: '265-2050310002802-85'
            }))
            : identifier === 'BIH' ?
                data.map(({ id,
                    ['Naziv primaoca']: ime,
                    ['Mjesto/Grad']: grad,
                    ['Poštanski broj']: zip,
                    ['Ulica/Adresa']: ulica,
                    ['Telefon']: telefon,
                    ['Vrijednost']: vrijednost,
                    ['Masa pošiljke']: masa,
                    ['Opis pošiljke']: opis
                }) => {
                    const brojRacuna = '194-1101147402-178'
                    const vrstaPosiljke = 'PAKET'
                    const brojPaketa = 1
                    const hitnaPosiljka = 12
                    const povratnica = 'da'
                    const osiguranje = 'ne'
                    const otvaranje = 'ne'
                    const dostavaVikendom = 'ne'
                    const zamjenskaPosiljka = 'ne'
                    const povratAmbalaze = 'ne'
                    return {
                        'Naziv primaoca': ime,
                        'Ulica/Adresa': ulica,
                        'Poštanski broj': zip,
                        'Mjesto/Grad': grad,
                        'Kontakt osoba': ime,
                        'Telefon': telefon,
                        'Broj računa/eksterna šifra': brojRacuna,
                        'Vrsta pošiljke': vrstaPosiljke,
                        'Masa pošiljke': parseFloat((masa / 1000).toFixed(1)),
                        'Broj paketa': brojPaketa,
                        'Vrijednost': vrijednost,
                        'Opis pošiljke': opis.toString(),
                        'Hitna pošiljka do (h)': hitnaPosiljka,
                        'Otkupnina iznos': vrijednost,
                        'Povratnica (da/ne)': povratnica,
                        'Osiguranje (da/ne)': osiguranje,
                        'Dozvoljeno otvaranje (da/ne)': otvaranje,
                        'Dostava vikendom (da/ne)': dostavaVikendom,
                        'Zamjenska pošiljka (da/ne)': zamjenskaPosiljka,
                        'Povrat ambalaže (da/ne)': povratAmbalaze
                    }
                })
                : data
        ws = XLSX.utils.json_to_sheet(dataCleaned)
        ws['!cols'] = Object.keys(dataCleaned[0]).map(key => ({
            wch: Math.max(10, key.length + 2, ...dataCleaned.map(row => row[key]?.toString().length || 0))
        }))
    }
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()

    const date = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}.`

    // const ws = identifier === 'niv' ? XLSX.utils.aoa_to_sheet(nivWs) : XLSX.utils.json_to_sheet(dataCleaned)
    // const ws = XLSX.utils.json_to_sheet(dataCleaned)

    // ws['!cols'] = Object.keys(dataCleaned[0]).map(key => ({
    //     wch: Math.max(10, key.length + 2, ...dataCleaned.map(row => row[key]?.toString().length || 0))
    // }))

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Orders")
    XLSX.writeFile(wb, identifier === 'niv' ? `${date} NIVELACIJE BIH.xlsx` : `${identifier === 'BIH' ? 'BiH ' : ''}${date} Kontroverzan.xlsx`)

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