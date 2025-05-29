import { Button } from "@/components/ui/button";
import { IoArrowForwardOutline } from "react-icons/io5";
import { exportExcel } from "./utils/exportExcel"
import { toast } from 'sonner'

export function ExportButton({ data, identifier }) {

    async function handleExport() {
        // await exportExcel(data, identifier)
        toast.info('Export Disabled!',
            { description: 'Export button is disabled for demo purposes' }
        )
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