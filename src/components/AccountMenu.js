import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { IoPersonOutline } from "react-icons/io5"
import { IoLogOutOutline } from "react-icons/io5"
import UserInfo from "./UserInfo"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"


export default async function AccountMenu() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    return (
        <Popover>
            <PopoverTrigger>
                <div className="flex flex-row justify-center items-center gap-3 bg-white rounded-[7px] p-1 px-1.5 sm:pr-3 border border-[rgb(228, 228, 231)] hover:bg-ghostBtn">
                    <div className="bg-[#acff5c] rounded-[5px] p-1">
                        <IoPersonOutline
                            color="#0f0f0f"
                            size={30}
                        />
                    </div>
                    <UserInfo />
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col h-full w-full border border-dashed rounded-md">
                    {/* <div className="border-b border-dashed p-2">{user.given_name}</div>
                    <div className="border-b border-dashed p-2">{user.family_name}</div> */}
                    {user ? <div className="flex flex-row items-center border-b  p-3 pb-4">
                        <div className="flex items-center justify-center rounded-full bg-[#acff5c] w-[40px] h-[40px] mr-[7px] outline outline-[1.5px] outline-offset-2 outline-black select-none ">
                            {user.given_name[0]}
                            {user.family_name[0]}
                        </div>
                        {user.email}
                    </div>
                        : <div className="flex flex-row items-center border-b  p-3 pb-4">
                            <div className="flex items-center justify-center rounded-full bg-[#acff5c] w-[40px] h-[40px] mr-[7px] outline outline-[1.5px] outline-offset-2 outline-black select-none ">
                                --
                            </div>
                            .Loading
                        </div>}
                    <div className="flex justify-end items-center p-1">

                        <LogoutLink className="flex w-full justify-end items-center relative group p-2 rounded-[5px] hover:bg-ghostBtn">
                            <span className="mr-1">Log out</span>
                            <IoLogOutOutline
                                size={40}
                                color="#2b2b2b"
                                className="rounded-[5px] hover:outline outline-4 outline-ghostBtn hover:bg-ghostBtn"
                            />
                        </LogoutLink>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}