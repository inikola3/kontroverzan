import * as XLSX from 'xlsx'
import { toast } from 'sonner'

export async function exportExcel(data, identifier) {
    if (!data || data.length === 0) {
        toast.error("No data available to download.", {
            description: "Please select data from the table.",
        })
        return
    }

    const totalDailyDiscount = identifier === 'niv' ?
        data.reduce((sum, row) => sum + (typeof row.Popust === 'number' ? row.Popust : 0), 0)
        : 0

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
                const brojPaketa = '1'
                const hitnaPosiljka = '12'
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
                    'Masa pošiljke': masa,
                    'Broj paketa': brojPaketa,
                    'Vrijednost': vrijednost,
                    'Opis pošiljke': opis,
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
            : data.map(({ id, ...rest }) => rest)

    // const divider = ''
    if (identifier === 'niv') {
        // dataCleaned.push({ ['Ime']: '', ['Popust']: '' })
        dataCleaned.push({ ['Ime']: 'Ukupno:', ['Popust']: totalDailyDiscount })
        // dataCleaned[0] = { ...dataCleaned[0], ['']: divider, ['Ukupno']: totalDailyDiscount }
    }

    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()

    const date = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}.`

    const ws = XLSX.utils.json_to_sheet(dataCleaned)

    ws['!cols'] = Object.keys(dataCleaned[0]).map(key => ({
        wch: Math.max(10, key.length + 2, ...dataCleaned.map(row => row[key]?.toString().length || 0))
    }))

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