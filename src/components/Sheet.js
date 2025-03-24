import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { IoGridOutline } from "react-icons/io5"
import { IoFileTrayStackedOutline } from "react-icons/io5"
import { IoReceiptOutline } from "react-icons/io5"
import { IoMenuOutline } from "react-icons/io5"
import Link from "next/link"


export function SheetComponent() {
    return (
        <Sheet>
            <SheetTrigger className='sm:hidden order-last' asChild>
                <Button variant="outline" className="rounded-[7px] h-[47px] w-[50px]">
                    <IoMenuOutline
                        size={30}
                    />
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-2/5 rounded-t-3xl pb-14">
                <SheetHeader>
                    <SheetTitle>Navigation Menu</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="flex-row justify-between items-center h-full rounded-2xl">
                    <nav className="flex flex-row items-center h-full p-5" aria-label="Main Navigation">
                        <ul className="flex flex-col justify-evenly w-full p-3 py-5 gap-3">
                            <li className="relative p-2 w-full group rounded-xl border">
                                <Link href='/dashboard' className="flex flex-row items-center gap-3 w-full p-1 rounded-[7px] hover:bg-ghostBtn" >
                                    <IoGridOutline
                                        size={50}
                                        color="#2b2b2b"
                                    />
                                    <span className="ml-9">Dashboard</span>
                                </Link>
                            </li>
                            <li className="relative p-2 w-full group rounded-xl border">
                                <Link href='/orders' className="flex flex-row items-center gap-3 w-full p-1 rounded-[7px] hover:bg-ghostBtn">
                                    <IoFileTrayStackedOutline
                                        size={50}
                                        color="#2b2b2b"
                                    />
                                    <span className="ml-9">Orders</span>
                                </Link>
                            </li>
                            <li className="relative p-2 w-full group rounded-xl border">
                                <Link href='/financials' className="flex flex-row items-center gap-3 w-full p-1 rounded-[7px] hover:bg-ghostBtn">
                                    <IoReceiptOutline
                                        size={50}
                                        color="#2b2b2b"
                                    />
                                    <span className="ml-9">Financial Reports</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
    )
}