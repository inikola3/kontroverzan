'use-client'

import { Checkbox } from "@/components/ui/checkbox"

const replaceDiacritics = (text) => {
    if (!text) return ''
    return text
        .replace(/ć/g, 'c')
        .replace(/č/g, 'c')
        .replace(/đ/g, 'dj')
        .replace(/š/g, 's')
        .replace(/ž/g, 'z')
        .replace(/Ć/g, 'C')
        .replace(/Č/g, 'C')
        .replace(/Đ/g, 'Dj')
        .replace(/Š/g, 'S')
        .replace(/Ž/g, 'Z');
}

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)} //toggleAllPageRowsSelected for selecting only page rows
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="mr-2"
            />
        ),
    },
    {
        accessorKey: 'orderStatus',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('orderStatus');

            const statusStyles = {
                unfulfilled: 'bg-unfulfilledStatusBg border-2 border-unfulfilledStatusBd',
                fulfilled: 'bg-fulfilledStatusBg border-2 border-fulfilledStatusBd',
            }

            return (
                <span className={`${statusStyles[status]} text-black font-bold px-3 py-1 rounded-full text-sm`}>
                    {status}
                </span>
            );
        },
    },
    {
        accessorKey: 'customerName',
        header: 'Name',
        cell: ({ row }) => {
            const name = row.getValue('customerName')
            return (
                <span className="font-sans">{name}</span>
            )
        }
    },
    {
        accessorKey: 'city',
        header: 'City',
        cell: ({ row }) => {
            const city = row.getValue('city')
            return (
                <span className="font-sans">{city}</span>
            )
        }
    },
    {
        accessorKey: 'zip',
        header: 'Zip',
        cell: ({ row }) => {
            const zip = row.getValue('zip')
            return (
                <span className="font-sans">{zip}</span>
            )
        }
    },
    {
        accessorKey: 'street',
        header: 'Street',
        cell: ({ row }) => {
            const street = row.getValue('street')
            return (
                <span className="font-sans">{street}</span>
            )
        }
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone',
        cell: ({ row }) => {
            const phoneNumber = row.getValue('phoneNumber')
            return (
                <span className="font-sans">{phoneNumber}</span>
            )
        }
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            const country = row.original.country
            const price = row.getValue('price')

            const formattedPrice = country === 'Serbia'
                ? Math.round(parseFloat(price))
                : parseFloat(price).toFixed(2)
            return (
                <span className="font-sans">{formattedPrice}</span>
            )
        }
    },
    {
        accessorKey: 'weight',
        header: 'Weight',
        cell: ({ row }) => {
            const weight = row.getValue('weight')
            return (
                <span className="font-sans">{weight}</span>
            )
        }
    },
    {
        accessorKey: 'notes',
        header: 'Notes',
        cell: ({ row }) => {
            const notes = row.getValue('notes')
            return (
                <span className="font-sans">{notes}</span>
            )
        }
    },
]