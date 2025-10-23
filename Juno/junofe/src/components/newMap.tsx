"use client"

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import {Icon, LatLngExpression,} from "leaflet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Marker as LeafletMarker } from 'leaflet';


const center = {
lag: 18.476063, 
long: -69.913078
}

export default function newMap() {
    const [draggable, setDraggable] = useState(true);
    const [position, setPosition] = useState<LatLngExpression>([18.476063, -69.913078]);
    const markerRef = useRef<LeafletMarker>(null)

    const eventHandlers = useCallback(
        () => {
            const marker = markerRef.current
            if (marker != null) {
                setPosition(marker.getLatLng())
            }

        },
        [],
    );

    useEffect(() => {
        console.log(position);
    }, [position]);

    const markIcon = new Icon({
        iconUrl: 'marker-icon.png',
        shadowUrl: "/marker-shadow.png",
        iconSize: [22, 32],
        shadowSize: [41, 41],
        iconAnchor: [22, 64],
        shadowAnchor: [24, 72],
        popupAnchor: [-11, -62]
    });

    return (
        <MapContainer
            center={[18.6652909, -71.449683, 409710]}
            zoom={6}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
                position={position}
                draggable={draggable}
                icon={markIcon}
                eventHandlers={{dragend: eventHandlers}}
                ref={markerRef}
            >
                <Popup>hello {position.toString()}</Popup>
            </Marker>



        </MapContainer>
    )
}
