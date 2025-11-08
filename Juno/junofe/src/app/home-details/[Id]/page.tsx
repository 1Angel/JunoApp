import Map from "@/components/Map";
import MapMarker from "@/components/Marker";
import { Properties } from "@/types";
import dynamic from "next/dynamic";

interface Props {
    params: { Id: number }
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

    return (
        <>
            <p>Details page</p>
            <h1>{property.description}</h1>

            <div>
                <div className="w-200 h-100 border rounded-2xl p-10">
                    <DynamicMap zoom={15} position={[property.latitude, property.longitude]}>
                        <MapMarker
                            position={[property.latitude, property.longitude]}
                            data={property}
                        />
                    </DynamicMap>
                </div>
            </div>
        </>
    )
}