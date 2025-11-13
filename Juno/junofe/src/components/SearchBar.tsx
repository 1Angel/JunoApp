"use client"

import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import HomeStatusFilter from "./HomeStatusFilter";
import PriceFilter from "./PriceFilter";

export default function SearchBar() {

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

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
                <HomeStatusFilter/>
                <PriceFilter/>
        </div>
    )
}