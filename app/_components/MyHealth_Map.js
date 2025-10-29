'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const localLocations = [
    {
        text: "UTD Hypothetical Health Center", 
        position: [32.9859, -96.7503]
    },
    {
        text: "Another Hypothetical Health Center",
        position: [32.859, -96.8503]
    },
    {
        text: "Lakewood Neighborhood Medical Clinic",
        position: [33, -96.85]
    },
    {
        text: "Trinity Express Urgent Care",
        position: [32.9910, -96.8400]
    }
];

function MyHealth_Map() {
    return (
        <MapContainer center={[32.9859, -96.7503]} zoom={13} style={{ height: "400px", width: "100%" }}>
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