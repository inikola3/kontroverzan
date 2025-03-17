import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"
import { Toaster } from "@/components/ui/sonner"

export default function KntrzLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="flex relative">
                <Sidebar />
                {children}
                <Toaster richColors />
            </div>
        </div>
    );
}