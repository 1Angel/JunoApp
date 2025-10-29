"use client"

import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer } from 'react-leaflet'

export default function Map({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <MapContainer
            center={[18.6652909, -71.449683, 409710]}
            zoom={6}
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