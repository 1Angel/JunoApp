"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

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
        value: "FOR_SALE"
    }
]


export default function SearchBar() {

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const defaultHomeStatus = searchParams.get('homestatus') ?? "FOR_RENT";

    const [homeStatus, setHomeStatus] = useState<string>(defaultHomeStatus);

    //FIX THIS SHIT
    const handleHomeStatus = () => {
        console.log(`tu seleccion es `, homeStatus);
        const params = new URLSearchParams(searchParams);
        if (homeStatus == "FOR_RENT") {
            params.set('homestatus', homeStatus);
            params.set('page', String(1));
        } else {
            params.set('homestatus', homeStatus);
            params.set('page', String(1));
        }
        replace(`${pathName}?${params.toString()}`);
    }

    const handleSearch = useDebouncedCallback((term: string) => {
        console.log(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('search', term)
        } else {
            params.delete('search');
        }
        replace(`${pathName}?${params.toString()}`);
    }, 300);

    return (

        <div className="flex items-center justify-center gap-2">
            <div className="w-150 bg-white">
                <Input
                    className="border-1 border-black py-4 hover:border-red-500 hover:border-2 focus:border-red-500 focus:ring-0 focus-visible:ring-0 focus-visible:border-red-500"
                    type="text"
                    placeholder="Ingresa la ciudad"
                    defaultValue={searchParams.get('search')?.toString()}
                    onChange={(e) => { handleSearch(e.target.value) }}
                />
            </div>
            <div >
                <Select value={homeStatus} onValueChange={setHomeStatus}>
                    <SelectTrigger className="font-bold text-sm w-[180px] border-1 border-black hover:border-red-500 hover:border-1 focus:border-red-500 focus:ring-0 focus-visible:ring-0 focus-visible:border-red-500">
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
                        <div className="py-2">
                            <button onClick={handleHomeStatus} className="w-full rounded h-[30px] btn bg-red-500 text-white">Aceptar</button>

                        </div>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}