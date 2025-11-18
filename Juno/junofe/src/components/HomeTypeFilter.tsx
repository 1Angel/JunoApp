"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectTrigger } from "./ui/select";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "./ui/button";

interface HomeType {
    title: string;
    value: string;
}

const HomeTypesOptions: HomeType[] = [
    {
        title: "Apartamento",
        value: "APARTMENT"
    },
    {
        title: "Casa",
        value: "HOUSE"
    },
    {
        title: "Pent House",
        value: "PENT_HOUSE"
    },
    {
        title: "",
        value: ""
    }
]


export const HomeTypeFilter = () => {

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const defaultHomeType = searchParams.get('homeType') ?? "HOUSE";
    const [homeType, setHomeType] = useState<string>(defaultHomeType);

    const handlerHomeType = () => {
        const params = new URLSearchParams(searchParams);
        if (homeType == "APARTMENT") {
            params.set('homeType', homeType);
        } else if (homeType == "HOUSE") {
            params.set('homeType', homeType);
        } else if (homeType == "PENT_HOUSE") {
            params.set('homeType', homeType);
        }
        replace(`${pathName}?${params.toString()}`);
    }


    return (
        <div className="w-full sm:w-auto px-2 py-3 transition-colors cursor-pointer">
            <Select value={homeType} onValueChange={setHomeType}>
                <SelectTrigger className={clsx(
                    "w-[180px] border",
                    homeType
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-300"
                )}>
                    {HomeTypesOptions.find((o) => o.value === homeType)?.title}
                </SelectTrigger>
                <SelectContent>
                    <RadioGroup value={homeType} onValueChange={setHomeType}>
                        {
                            HomeTypesOptions.map((e) => (
                                <div key={e.value} className="flex items-center gap-3">
                                    <RadioGroupItem value={e.value} id="r1" />
                                    <label htmlFor={e.value}>{e.title}</label>
                                </div>
                            ))
                        }
                    </RadioGroup>
                    <div className="py-2">
                        <Button onClick={handlerHomeType} className="w-full rounded h-[30px] btn bg-red-500 text-white cursor-pointer hover:bg-red-700 hover:text-white">Aceptar</Button>

                    </div>
                </SelectContent>
            </Select>
        </div>
    )
}