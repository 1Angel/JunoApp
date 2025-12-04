"use client"

import { Marker, Popup } from "react-leaflet"
import L, { LatLngExpression, LeafletEventHandlerFnMap } from "leaflet";
import { Marker as LeafletMarker } from 'leaflet';
import { Ref } from "react";
import { Properties } from "@/types";
import HouseCard from "./Card";


interface Props {
    position: LatLngExpression
    // popUpTitle: string | number;
    draggable?: boolean;
    marketEvent?: LeafletEventHandlerFnMap | undefined;
    marketRef?: Ref<LeafletMarker<any>> | undefined;
    data: Properties
}

export default function MapMarker({ marketEvent, draggable, marketRef, position, data }: Props) {

    const markIcon = new L.Icon({
        iconUrl: '/marker-icon.png',
        shadowUrl: "/marker-shadow.png",
        iconSize: [22, 32],
        shadowSize: [32, 32],
        iconAnchor: [11, 32],
        shadowAnchor: [11, 32],
        popupAnchor: [0, -28]
    });

    return (
        <Marker
            position={position}
            icon={markIcon}
            eventHandlers={marketEvent}
            draggable={draggable}
            ref={marketRef}
        >
        </Marker>
    )
}