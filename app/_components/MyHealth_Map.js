'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MyHealth_Map() {
    return (
        <MapContainer center={[32.9859, -96.7503]} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[32.9859, -96.7503]}>
                <Popup>Fake location</Popup>
            </Marker>
        </MapContainer>
    )
}

export default MyHealth_Map;