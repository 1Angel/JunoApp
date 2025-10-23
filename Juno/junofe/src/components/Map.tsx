"use client"
import { Properties, PropertiesResponse } from "@/types";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from "leaflet";


interface Props {
    lat: number[];
    long: number[];
}
export default function Map(props: PropertiesResponse) {

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
        <MapContainer
            center={[18.6652909, -71.449683, 409710]}
            zoom={6}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                props.results.map((e) => (
                    <Marker key={e.id} position={[e.latitude, e.longitude]} icon={markIcon}>
                        <Popup>{e.price}</Popup>
                    </Marker>
                ))
            }

        </MapContainer>
    )
}