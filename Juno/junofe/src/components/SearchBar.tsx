"use client"

import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import HomeStatusFilter from "./HomeStatusFilter";
import PriceFilter from "./PriceFilter";
import { Home, MapPin, Search } from "lucide-react";
import { Button } from "./ui/button";
import { HomeTypeFilter } from "./HomeTypeFilter";

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

        <div className="sticky top-16 z-30 border-b border-gray-200 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                    {/* Location Input */}
                    <div className="w-full sm:flex-1 flex items-center gap-3 px-4 py-3 hover:border-red-700 bg-white rounded-lg border border-gray-300">
                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Enter location, address, or zip"
                            onChange={(e) => handleSearch(e.target.value)}
                            className="flex-1 outline-none bg-transparent text-foreground placeholder:text-gray-500 text-sm"
                        />
                    </div>

                    {/* Price Range Dropdown */}
                    <PriceFilter />

                    {/* Status Dropdown */}
                    <HomeStatusFilter />

                    {/* home type dropdown*/}
                    <HomeTypeFilter/>
                </div>
            </div>
        </div>

    )
}