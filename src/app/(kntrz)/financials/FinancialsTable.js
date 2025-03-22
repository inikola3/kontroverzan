import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel } from "@tanstack/react-table"
import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OrderDates } from "../dashboard/OrderDates"
import { CountryFilter } from "@/components/CountryFilter"
import { IoSearchOutline } from "react-icons/io5"
import { ExportButton } from "../dashboard/ExportButton"

export function FinancialsTable({ columns, data, country, setCountry, refreshOrders }) {
    const [columnFilters, setColumnFilters] = React.useState([])
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 50,
            },
        },
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            rowSelection,
        },

    })

    // const rowsModel = table.getSelectedRowModel().rows

    // if (rowsModel.length > 0) {
    //     const country = rowsModel[0].original.country
    // }

    // const rowData = rowsModel.map((row) => ({
    //     id: row.original.id,
    //     status: row.original.orderStatus,
    //     ['Shipping address: Name']: row.original.customerName,
    //     ['Shipping address: City']: row.original.city,
    //     ['Shipping address: Zip']: row.original.zip,
    //     ['Shipping address: First line']: row.original.street,
    //     ['Shipping address: Phone']: row.original.phoneNumber,
    //     // [country === 'Serbia' ? 'Cena' : 'Cijena']: row.original.price,
    //     ['Shop original total price']: row.original.price,
    //     ['Total weight']: row.original.weight,
    //     ['Shipping address: Second line']: row.original.notes
    // }))

    //console.log('Rows Selected: ', rowData)

    return (
        <div className="w-full">
            <div className="flex relative items-center justify-between py-4">
                <div className="flex sm:items-center sm:flex-row flex-col gap-3">
                    <div className="flex items-center">
                        <IoSearchOutline className="absolute left-3.5 text-black text-lg cursor-pointer"
                            onClick={() => document.getElementById("searchInput")?.focus()}
                        />
                        <Input
                            id="searchInput"
                            placeholder="Filter names..."
                            value={(table.getColumn("customerName")?.getFilterValue()) ?? ""}
                            onChange={(event) =>
                                table.getColumn("customerName")?.setFilterValue(event.target.value)
                            }
                            className="focus:max-w-[230px] max-w-[30px] h-9 pl-8 transition-[max-width] duration-300 ease-in-out"
                        />
                    </div>
                    <OrderDates
                        table={table}
                    />
                </div>
                <div className="flex relative sm:flex-row flex-col gap-3">
                    {/* <CountryFilter
                        country={country}
                        setCountry={setCountry}
                    /> */}
                    {/* <ExportButton
                        data={rowData}
                        country={country}
                        refreshOrders={refreshOrders}
                    /> */}
                </div>
            </div>
            <div className="rounded-xl border w-full">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 py-10 text-center'>
                                    <img src="/noResults.svg" alt="No results found illustration" className="max-h-[220px] w-auto m-auto" />
                                    <span> No results.</span>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4 ml-2">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>

                <div className="flex items-center justify-end space-x-2 py-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}