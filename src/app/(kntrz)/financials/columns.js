'use-client'

import { Checkbox } from "@/components/ui/checkbox"

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
        accessorKey: 'totalDiscounts',
        header: 'Discounts',
        cell: ({ row }) => {
            const discount = row.getValue('totalDiscounts')

            const formattedDiscount = parseFloat(discount).toFixed(2)
            return (
                <span className="font-sans">{formattedDiscount}</span>
            )
        }
    },
]