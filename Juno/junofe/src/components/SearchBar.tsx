"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface HomeStatus {
    title: string;
    value: string;
}

const homeStatusOptions: HomeStatus[] = [
    {
        title: "En renta",
        value: "FOR_RENT"
    },
    {
        title: "En venta",
        value: "FOR_SELL"
    }
]


export default function SearchBar() {

    var [homeStatus, setHomeStatus] = useState<string>("FOR_RENT");

    useEffect(() => {
        console.log(`esta cambiando ${homeStatus}`)
    }, [homeStatus])

    return (

        <div className="flex items-center justify-center gap-2">
            <div className="w-150 bg-white">
                <Input
                    className="border-1 border-black py-4 hover:border-red-500 hover:border-2 focus:border-red-500 focus:ring-0 focus-visible:ring-0 focus-visible:border-red-500"
                    type="text"
                    placeholder="Ingresa la ciudad"
                />

            </div>
            <div className="border-1 rounded-2xl border-black hover:border-red-500 hover:border-2 focus:border-red-500 focus:ring-0 focus-visible:ring-0 focus-visible:border-red-500">
                <Select value={homeStatus} onValueChange={setHomeStatus}>
                    <SelectTrigger className="w-[180px]">
                        {homeStatusOptions.find((o) => o.value === homeStatus)?.title}
                    </SelectTrigger>
                    <SelectContent>
                        <RadioGroup value={homeStatus} onValueChange={setHomeStatus}>
                            {
                                homeStatusOptions.map((e) => (
                                    <div key={e.value} className="flex items-center gap-3">
                                        <RadioGroupItem value={e.value} id="r1" />
                                        <label htmlFor={e.value}>{e.title}</label>
                                    </div>
                                ))
                            }
                        </RadioGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}