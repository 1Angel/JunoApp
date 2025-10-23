import { Marker, Popup } from "react-leaflet"
import L from "leaflet";

interface Props{
    lat: number;
    long: number;
    popUpTitle: string | number
}


export default function MapMarker({lat, long, popUpTitle}: Props){

        const markIcon = new L.Icon({
            iconUrl: 'marker-icon.png',
            shadowUrl: "/marker-shadow.png",
            iconSize: [22, 32],
            shadowSize: [41, 41],
            iconAnchor: [22, 64],
            shadowAnchor: [24, 72],
            popupAnchor: [-11, -62]
        })
    return (
        <Marker position={[lat, long]} icon={markIcon}>
            <Popup>{popUpTitle}</Popup>
        </Marker>
    )
}