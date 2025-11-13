"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger } from "./ui/select";
import { useState } from "react";
import clsx from "clsx";

function formatPrices(number: number, locale = "en-US", currency = "USD") {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        notation: 'compact',
        compactDisplay: 'short',
        maximumSignificantDigits: 3
    });

    return formatter.format(number);
}

export default function PriceFilter() {

    const pathName = usePathname();
    const searchParam = useSearchParams();
    const { replace } = useRouter();

    const defaultMinPrice = searchParam.get('minPrice') ?? '1000';
    const defaultMaxPrice = searchParam.get('maxPrice') ?? '25000';

    const [minPrice, setMinPrice] = useState<number>(Number(defaultMinPrice));
    const [maxPrice, setMaxPrice] = useState<number>(Number(defaultMaxPrice));

    const prices = `${formatPrices(minPrice)}- ${formatPrices(maxPrice)}`;

    const handlerPrices = () => {
        const params = new URLSearchParams(searchParam);
        params.set('minPrice', minPrice.toString());
        params.set('maxPrice', maxPrice.toString());

        replace(`${pathName}?${params}`);
    }

    return (
        <div>
            <Select>
                <SelectTrigger value={prices} className={clsx(
                    "w-[180px] border font-bold",
                    prices
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-300"
                )}>
                    {prices}
                </SelectTrigger>
                <SelectContent>
                    <div className="inline-block pr-2 w-25">
                        Precio Min <Input onChange={(e) => (setMinPrice(Number(e.target.value)))} defaultValue={1000} />

                    </div>
                    <span className="font-bold text-2xl">-</span>
                    <div className="inline-block pl-2 w-25">
                        Precio Max <Input onChange={(e) => (setMaxPrice(Number(e.target.value)))} defaultValue={25000} />

                    </div>
                    <div className="py-2">
                        <button onClick={handlerPrices} className="w-full rounded h-[30px] btn bg-red-500 text-white cursor-pointer hover:bg-red-700 hover:text-white">Aceptar</button>

                    </div>
                </SelectContent>
            </Select>
        </div>
    )
}