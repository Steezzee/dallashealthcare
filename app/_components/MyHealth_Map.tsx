'use client';

import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

interface Location {
    popUp: string;
    position: [number, number];
    inNetwork: 'true' | 'false';
}

const customIcon = new Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconsize: [38, 38],
})

export default function MyHealth_Map() {
    const localLocations: Location[] = [
    {
        popUp: "UTD Hypothetical Health Center", 
        position: [32.9859, -96.7503],
        inNetwork: 'false'
    },
    {
        popUp: "Another Hypothetical Health Center",
        position: [32.859, -96.8503],
        inNetwork: 'true'
    },
    {
        popUp: "Lakewood Neighborhood Medical Clinic",
        position: [33, -96.85],
        inNetwork: 'false'
    },
    {
        text: "Trinity Express Urgent Care",
        position: [32.9910, -96.8400],
        inNetwork: 'true'
    }
];

    return (
        <MapContainer center={[32.9859, -96.7503]} 
            zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {localLocations.map((loc) => (
                <Marker position={loc.position} 
                    icon={customIcon}>
                    <Popup>{loc.popUp}</Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}