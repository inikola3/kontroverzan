'use-client'
import { Badge } from "@/components/ui/badge"
import { IoCalendarOutline } from "react-icons/io5"


export function OrderDates({ table }) {
    const dateArray = table.getCoreRowModel().rows
    const dates = []
    if (dateArray.length != 0) {
        dateArray.forEach((row) => {
            const dateObj = new Date(row.original.createdAt)
            const day = dateObj.getDate()
            if (!dates.includes(day)) {
                dates.push(day)
            }
        })
    }

    dates.sort()

    return (
        <Badge variant="outline" className="relative flex items-center justify-start gap-3 min-w-[100px] px-3 h-9 max-w-fit text-[#2b2b2b]">
            <IoCalendarOutline
                size={25}
                className="relative sm:left-0"
            />
            <div>
                {dates.length > 0 ? (dates.map((date, index) => (
                    <span key={date}>
                        {date}
                        {index !== dates.length - 1 && "|"}
                    </span>
                ))) : 'No dates'}
            </div>
        </Badge>
    )
}