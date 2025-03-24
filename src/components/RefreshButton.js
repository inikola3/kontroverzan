import { Button } from "@/components/ui/button"
import { ListRestart } from "lucide-react"
import { Loader } from "lucide-react"

export function RefreshButton({ refreshOrders, loading }) {

    return (
        <Button
            id="refresh"
            variant={"outline"}
            className="max-w-[40px]"
            onClick={refreshOrders}
            disabled={loading}
        >
            {loading ? <Loader className="animate-spin" /> : <ListRestart />}
        </Button>
    )
}