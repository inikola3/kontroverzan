import { Button } from "@/components/ui/button";
import { IoArrowForwardOutline } from "react-icons/io5";
import { exportExcel } from "./utils/exportExcel"

export function ExportButton({ data, country, refreshOrders }) {

    async function handleExport() {
        await exportExcel(data, country)
        // refreshOrders()
    }

    return (
        <Button
            onClick={() => handleExport()}
        >
            Export
            <IoArrowForwardOutline
                className="-rotate-[45deg]"
            />
        </Button>
    )
}