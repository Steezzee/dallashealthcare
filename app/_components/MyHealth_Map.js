'use client';

import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MyHealth_Map() {
    return (
        <MapContainer center={[32.7767, -96.7970]} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default MyHealth_Map;