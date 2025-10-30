'use client';

import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const localLocations = [
    {
        text: "UTD Hypothetical Health Center", 
        position: [32.9859, -96.7503],
        inNetwork: 'false'
    },
    {
        text: "Another Hypothetical Health Center",
        position: [32.859, -96.8503],
        inNetwork: 'true'
    },
    {
        text: "Lakewood Neighborhood Medical Clinic",
        position: [33, -96.85],
        inNetwork: 'false'
    },
    {
        text: "Trinity Express Urgent Care",
        position: [32.9910, -96.8400],
        inNetwork: 'true'
    }
];

function MyHealth_Map() {
    return (
        <MapContainer center={[32.9859, -96.7503]} 
            zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {localLocations.map((loc, idx) => (
                <Marker key={idx} position={loc.position}>
                <Popup>{loc.text}</Popup>
                </Marker>   
            ))}
        </MapContainer>
    )
}

export default MyHealth_Map;