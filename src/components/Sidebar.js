import { IoGridOutline } from "react-icons/io5"
import { IoLogOutOutline } from "react-icons/io5"
import { IoFileTrayStackedOutline } from "react-icons/io5"
import { IoReceiptOutline } from "react-icons/io5"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import Link from "next/link"

export function Sidebar() {
    return (
        <div className="z-[9999] sm:flex hidden fixed top-[80px] flex-col justify-between items-center h-[calc(100dvh-80px)] w-[64px] pt-[10%] pb-[7vh] border-r border-dashed border-[rgb(228, 228, 231)]">
            <nav className="flex flex-col items-center w-full" aria-label="Main Navigation">
                <ul className="flex flex-col gap-[70px]">
                    <li className="navBtn relative p-0.5 group">
                        <Link href='/dashboard'>
                            <IoGridOutline
                                size={40}
                                color="#2b2b2b"
                                className="transition-transform duration-300 ease-in-out group-hover:-translate-y-2 rounded-[5px] hover:outline outline-4 outline-ghostBtn hover:bg-ghostBtn"
                            />
                            <span className="tooltiptext translate-y-0.5">Dashboard</span>
                        </Link>

                    </li>
                    <li className="navBtn relative group">
                        <Link href='/orders'>
                            <IoFileTrayStackedOutline
                                size={40}
                                color="#2b2b2b"
                                className="transition-transform duration-300 ease-in-out group-hover:-translate-y-2 rounded-[5px] hover:outline outline-4 outline-ghostBtn hover:bg-ghostBtn"
                            />
                            <span className="tooltiptext">Orders</span>
                        </Link>
                    </li>
                    <li className="navBtn relative group">
                        <Link href=''>
                            <IoReceiptOutline
                                size={40}
                                color="#2b2b2b"
                                className="transition-transform duration-300 ease-in-out group-hover:-translate-y-2 rounded-[5px] hover:outline outline-4 outline-ghostBtn hover:bg-ghostBtn"
                            />
                            <span className="tooltiptext -translate-y-2.5">Financial Reports</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            {/* <LogoutLink className="navBtn relative group">
                <IoLogOutOutline
                    size={40}
                    color="#2b2b2b"
                    className="transition-transform duration-300 ease-in-out group-hover:-translate-y-2 rounded-[5px] hover:outline outline-4 outline-ghostBtn hover:bg-ghostBtn"
                />
                <span className="tooltiptext">Logout</span>
            </LogoutLink> */}
        </div>
    )
}