import ImagesCarousel from "@/components/ImagesCorousel";
import Map from "@/components/Map";
import MapMarker from "@/components/Marker";
import { Properties } from "@/types";
import { EmblaOptionsType } from "embla-carousel";
import { Bath, Bed, Heart, MapPin, Maximize2, MessageSquare, Phone, Share2 } from "lucide-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

type Props = {
    params: Promise<{ Id: string }>
}
const OPTIONS: EmblaOptionsType = {}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = (await params).Id;

    const data = await fetch(`http://localhost:5036/api/properties/${id}`);
    const property: Properties = await data.json();

    return {
        title: `${property.address.street}, ${property.address.city} - Juno`,
        description: `${property.description}`,

    }
}

export default async function page({ params }: Props) {

    const { Id } = await params;

    const data = await fetch(`http://localhost:5036/api/properties/${Id}`);
    const property: Properties = await data.json();

    const DynamicMap = dynamic(() => import('../../../components/Map'), {
        loading: () => (
            <p>Cargando...</p>
        ),
        ssr: !!false
    })

    // const [isFavorite, setIsFavorite] = useState(false)
    // const [activeTab, setActiveTab] = useState("overview")

    const isFavorite = true;
    const setIsFavorite = (val: boolean) => {
        val = true;
    };


    const activeTab = "overview";
    const setActiveTab = (val: string) => {
        val = "overview";
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Header con navegación pegada */}
            <div className="top-16 z-30 bg-white border-b border-gray-100 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">{property.address.city}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className={`p-2 rounded-full transition-colors ${isFavorite ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
                        </button> */}
                        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2">

                        <div className="relative w-full h-96 sm:h-[500px] rounded-2xl overflow-hidden mb-6 bg-gray-200">
                            <ImagesCarousel slides={property.images} options={OPTIONS}/>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mb-8">
                            {/* <div className="flex gap-8">
                                {["overview", "features", "location"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 px-2 font-medium capitalize transition-colors ${activeTab === tab ? "text-black border-b-2 border-black" : "text-gray-600 hover:text-black"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div> */}
                        </div>

                        {activeTab === "overview" && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-3">About this property</h2>
                                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Bed className="w-5 h-5 text-gray-600" />
                                            <span className="text-sm text-gray-600">Bedrooms</span>
                                        </div>
                                        <p className="text-2xl font-bold">{property.bedrooms}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Bath className="w-5 h-5 text-gray-600" />
                                            <span className="text-sm text-gray-600">Bathrooms</span>
                                        </div>
                                        <p className="text-2xl font-bold">{property.bathrooms}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Maximize2 className="w-5 h-5 text-gray-600" />
                                            <span className="text-sm text-gray-600">Area</span>
                                        </div>
                                        <p className="text-2xl font-bold">{property.square_meters} m²</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* {activeTab === "overview" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {property.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                            <span className="font-medium text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )} */}

                        {activeTab === "overview" && (
                            <div>
                                <h2 className="text-2xl font-bold">Location</h2>
                                <div className="aspect-video rounded-lg flex items-center justify-center">
                                    <div className="w-200 h-100 text-gray-400">
                                        <DynamicMap zoom={15} position={[property.latitude, property.longitude]}>
                                            <MapMarker
                                                position={[property.latitude, property.longitude]}
                                                data={property}
                                            />
                                        </DynamicMap>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                    <div className="lg:col-span-1">

                        <div className="sticky top-40 space-y-4">
                            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                                <p className="text-sm text-gray-600 mb-2">Price</p>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                    RD$ {property.price.toLocaleString()}
                                </h3>
                                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors mb-3">
                                    Schedule Tour
                                </button>
                                <button className="w-full border border-red-600 text-red-600 hover:bg-blue-50 font-semibold py-3 rounded-lg transition-colors">
                                    Contact Agent
                                </button>
                            </div>


                            <div className="bg-white border border-gray-200 p-6 rounded-xl">
                                <p className="text-xs uppercase tracking-wide text-gray-500 mb-4">Listing Agent</p>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                        <img
                                            src={property.user.image || "/placeholder.svg"}
                                            alt={property.user.first_name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{property.user.first_name} {property.user.last_name}</h4>
                                        <p className="text-sm text-gray-600">Real Estate Expert</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium text-gray-700">
                                        <Phone className="w-4 h-4" />
                                        Call Agent
                                    </button>
                                    <button className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium text-gray-700">
                                        <MessageSquare className="w-4 h-4" />
                                        Send Message
                                    </button>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm">
                                    <p className="text-gray-600">Licensed Agent in Dominican Republic</p>
                                    <p className="text-gray-500">Available 9 AM - 6 PM EST</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
