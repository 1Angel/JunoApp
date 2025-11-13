"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import clsx from "clsx";

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

export default function HomeStatusFilter() {

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const defaultHomeStatus = searchParams.get('homestatus') ?? "FOR_RENT";

    const [homeStatus, setHomeStatus] = useState<string>(defaultHomeStatus);

    const handleHomeStatus = () => {
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

    return (
        <div>
            <Select value={homeStatus} onValueChange={setHomeStatus}>
                <SelectTrigger className={clsx(
                    "w-[180px] border",
                    homeStatus
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-300"
                )}>
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
                        <button onClick={handleHomeStatus} className="w-full rounded h-[30px] btn bg-red-500 text-white cursor-pointer hover:bg-red-700 hover:text-white">Aceptar</button>

                    </div>
                </SelectContent>
            </Select>
        </div>
    )

}