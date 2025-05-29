import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CountryFilter({ country, setCountry }) {
    return (
        <div className="sm:ml-3">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-9 w-full">
                        {country === "Serbia" ? <div className="flex flex-row">
                            <img src="/demo-flag.svg" alt="Demo flag" className="w-[20px] mr-3" />
                            Country 1
                        </div>
                            : <div className="flex flex-row">
                                <img src="/demo-flag.svg" alt="Demo flag" className="w-[20px] mr-3" />
                                Country 2
                            </div>
                        }
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Country</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={country} onValueChange={setCountry}>
                        <DropdownMenuRadioItem value="Serbia" className="cursor-pointer">
                            <img src="/demo-flag.svg" alt="Demo flag" className="w-[30px] mr-3" />
                            Country 1
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="BIH" className="cursor-pointer">
                            <img src="/demo-flag.svg" alt="Demo flag" className="w-[30px] mr-3" />
                            Country 2
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}