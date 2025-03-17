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
                        {country === "Serbia" ? <div className="flex flex-row"><img src="/serbia.svg" alt="Flag of Serbia" className="w-[20px] mr-3" />Serbia</div>
                            : <div className="flex flex-row"><img src="/bosnia.svg" alt="Flag of Bosnia" className="w-[20px] mr-3" />BIH</div>
                        }
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Country</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={country} onValueChange={setCountry}>
                        <DropdownMenuRadioItem value="Serbia" className="cursor-pointer"><img src="/serbia.svg" alt="Flag of Serbia" className="w-[30px] mr-3" />Serbia</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="BIH" className="cursor-pointer"><img src="/bosnia.svg" alt="Flag of Bosnia" className="w-[30px] mr-3" />BIH</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}