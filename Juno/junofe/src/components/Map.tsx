"use client"

import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer } from 'react-leaflet'

interface Props {
    position?: LatLngExpression | undefined;
    zoom: number;
    children?: React.ReactNode
}


export default function Map( {zoom, position, children }: Props) {

    return (
        <MapContainer
            //center={[18.6652909, -71.449683, 409710]}
            center={position}
            zoom={zoom}
            
            className="h-full w-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {children}

        </MapContainer>
    )
}