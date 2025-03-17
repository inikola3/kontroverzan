
import AccountMenu from "./AccountMenu"
import { SheetComponent } from "./Sheet"

export function Header() {
    return (
        <header className="flex items-center justify-between h-20 p-2 sm:pl-5 sm:pr-16 sticky top-0 z-20 bg-white border-b border-[rgb(228, 228, 231)] border-dashed">
            <SheetComponent />
            <div className="flex gap-[20px] items-center h-full sm:w-full sm:order-first order-2">
                <img src="/logoWithTextBlack.svg" alt="Black logo" className="h-[100%] sm:block hidden" />
                <img src="/logoBlack.svg" alt="Black logo" className="h-[100%] sm:hidden block" />
                {/* <p className="sm:block hidden select-none text-3xl text-black">KONTROVERZAN</p> */}
            </div>
            <AccountMenu />
        </header>


        /* <header className="flex items-center bg-[#0f0f0f] h-20 p-2 pl-5 pr-16 sticky top-0 z-20">
        <div className="flex gap-[20px] items-center h-full w-full">
            <img src="/logoWhite.svg" alt="Black logo" className="h-[100%]" />
            <p className="select-none text-3xl text-white">KONTROVERZAN</p>
        </div>
        <div className="flex flex-row justify-center items-center gap-3 bg-white rounded-[7px] p-1 px-1.5 pr-3">
            <div className="bg-[#acff5c] rounded-[5px] p-1">
                <IoPersonOutline
                    color="#0f0f0f"
                    size={30}
                />
            </div>
            <UserInfo />
        </div>
        </header> */
    )
}