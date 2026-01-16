"use client"

import { Properties } from "@/types"
import Carousel from "./Carousel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bath, Bed, Heart, MapPin, Ruler } from "lucide-react";
import { Button } from "./ui/button";
import { useCurrency } from "@/hooks/useCurrency";
import { ReactEventHandler, useState } from "react";

interface Props {
    data: Properties,
}

const RDCurrency = Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'DOP'
});

export default function HouseCard({ data }: Props) {
    const router = useRouter();
    const currency = useCurrency(data.price);


    const [favorite, setFavorite] = useState(false);

    const toggleBookmark = ()=>{
        console.log('jiji hola desde el hijo');
        if(favorite == false){
            setFavorite(true)
        }else{
            setFavorite(false)
        }
    }
    
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

        // <div className="border-0 overflow-hidden w-full shadow-2xl rounded-2xl cursor-pointer" onClick={() => router.push(`/home-details/${data.id}`)}>
        //     {/* <img className="w-full" src={'https://tse2.mm.bing.net/th/id/OIP.HyPO0GQqnsGoMcauAHz_MQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3'} /> */}
        //     <Carousel images={data.images} />
        //     <div>
        //         <span className="font-bold text-xl pl-4">RD$ {RDCurrency.format(data.price)}</span>
        //     </div>

        //     <div className="px-6 py-2 flex justify-center items-center">
        //         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.bedrooms} Bedrooms</span>
        //         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.bathrooms} Bathrooms</span>
        //         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.square_meters} M²
        //         </span>
        //     </div>
        //     <div className="px-6 pb-2">
        //             <p className="text-sm">
        //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 inline-block">
        //                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        //                     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        //                 </svg>
        //                 {data.address.street}, {data.address.city}, {data.address.province}</p>

        //         <p className="mt-1 text-xs">Vendido por {data.user.first_name} {data.user.last_name}</p>
        //     </div>

        // </div>

        <div className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-card border border-border">
            <div className="relative overflow-hidden h-64 bg-muted">
                <Carousel images={data.images} />
                <button onClick={toggleBookmark} className="absolute top-15 right-3 p-2 bg-white rounded-full shadow-md hover:bg-muted transition-colors">
                    <Heart className="w-5 h-5 text-primary" />
                </button>
                {data.homeStatus == "FOR_SALE" ? <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    En Venta
                </div> : <div className="absolute top-3 left-3 bg-red-700 text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    En Renta
                </div>}
            </div>

            <div className="p-5">
                <div className="mb-3">
                    <div className="text-2xl font-bold text-primary mb-1">DOP {currency}</div>
                    <div className="flex items-start gap-1">
                        <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-2" />
                        <div>
                            <div className="font-semibold text-foreground">{data.address.street}</div>
                            <div className="text-sm text-muted-foreground">{data.address.city}</div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 py-4 border-t border-b border-border mb-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Bed className="w-4 h-4" />
                        <span>{data.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Bath className="w-4 h-4" />
                        <span>{data.bathrooms} baths</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Ruler className="w-4 h-4" />
                        <span>{data.square_meters} sqft</span>
                    </div>
                </div>

                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <Link href={`/home-details/${data.id}`}>                    
                        View Details
                    </Link>
                </Button>
            </div>
        </div>
    )
}