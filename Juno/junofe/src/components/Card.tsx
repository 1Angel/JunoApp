import { Properties } from "@/types"
import Carousel from "./Carousel";

interface Props {
    data: Properties
}

const RDCurrency = Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'DOP'
});

export default function HouseCard({ data }: Props) {
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

        <div className="border-0 overflow-hidden w-full shadow-2xl rounded-2xl">
            {/* <img className="w-full" src={'https://tse2.mm.bing.net/th/id/OIP.HyPO0GQqnsGoMcauAHz_MQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3'} /> */}
            <Carousel/>
            <div>
                <span className="font-bold text-xl pl-4">RD$ {RDCurrency.format(data.price)}</span>
            </div>
            
            <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.bedrooms} Bedrooms</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.bathrooms} Bathrooms</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data.square_meters} M²
                </span>
            </div>
        </div>
    )
}