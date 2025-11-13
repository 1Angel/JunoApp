"use client"

import { Properties } from "@/types"
import Carousel from "./Carousel";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
    data: Properties
}

const RDCurrency = Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'DOP'
});

export default function HouseCard({ data }: Props) {
    const router = useRouter();
    return (
        // <div className="max-w-sm rounded overflow-hidden shadow-lg">
        //     <img className="w-full" src="https://tse3.mm.bing.net/th/id/OIP.5kGyoxY2XZDixSK0JrZLjQHaFE?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Sunset in the mountains" />
        //     <div className="px-6 py-4">
        //         <div className="font-bold text-xl">RD$ {RDCurrency.format(data.price)}</div>
        //     </div>
        //     <div className="px-6 pb-2">
        //         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.bedrooms} Beds</span>
        //         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.bathrooms} Baths</span>
        //         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.square_meters } M²
        //         </span>
        //     </div>
        // </div>

        <div className="border-0 overflow-hidden w-full shadow-2xl rounded-2xl cursor-pointer" onClick={() => router.push(`/home-details/${data.id}`)}>
            {/* <img className="w-full" src={'https://tse2.mm.bing.net/th/id/OIP.HyPO0GQqnsGoMcauAHz_MQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3'} /> */}
            <Carousel images={data.images} />
            <div>
                <span className="font-bold text-xl pl-4">RD$ {RDCurrency.format(data.price)}</span>
            </div>

            <div className="px-6 py-2 flex justify-center items-center">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.bedrooms} Bedrooms</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.bathrooms} Bathrooms</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.square_meters} M²
                </span>
            </div>
            <div className="px-6 pb-2">
                    <p className="text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        {data.address.street}, {data.address.city}, {data.address.province}</p>

                <p className="mt-1 text-xs">Vendido por {data.user.first_name} {data.user.last_name}</p>
            </div>

        </div>
    )
}