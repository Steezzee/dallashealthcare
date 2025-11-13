import React, { useEffect, useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

//fields associated with each clinic
export type Doctor = {
    name: string;
    specialty: string;
}
export type Location = {
    popUp: string;
    position: [number, number];
    inNetwork: 'true' | 'false';
    doctors: Doctor[];
}

type MyHealthMapFilteringProp = {
    filter: 'all' | 'inNetwork' | 'outOfNetwork';
    onLocationSelect?: (location: Location) => void;
}

const customIcon = new Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconAnchor: [13, 15],
})

export default function MyHealth_Map({ 
    filter,
    onLocationSelect 
}: {
    filter: 'all' | 'inNetwork' | 'outOfNetwork'; 
    onLocationSelect?: (location: Location) => void}
) {
    
    const [constant, setConstant] = React.useState(false);
    useEffect(() => setConstant(true), [])

    const localLocations: Location[] = [
    {
        popUp: "UTD Hypothetical Health Center", 
        position: [32.9859, -96.7503],
        inNetwork: 'false',
        doctors: [
            { name: "Dr. Smith", specialty: "Cardiology" },
            { name: "Dr. Johnson", specialty: "Dermatology" },
            { name: "Dr. Lee", specialty: "Neurology" },
            { name: "Dr. Martinez", specialty: "Psychiatry" },
        ]
    },
    {
        popUp: "Another Hypothetical Health Center",
        position: [32.9859, -96.77],
        inNetwork: 'true',
        doctors: [
            { name: "Dr. Williams", specialty: "Pediatrics" },
            { name: "Dr. Brown", specialty: "Orthopedics" },
            { name: "Dr. Davis", specialty: "Ophthalmology" },
        ]
    },
    {
        popUp: "Lakewood Neighborhood Medical Clinic",
        position: [32.9859, -96.76],
        inNetwork: 'false',
        doctors: [
            { name: "Dr. Taylor", specialty: "General Practice" },
            { name: "Dr. Anderson", specialty: "ENT" },
            { name: "Dr. Thomas", specialty: "Gynecology" },
        ]
    },
    {
        popUp: "Trinity Express Urgent Care",
        position: [32.9910, -96.78],
        inNetwork: 'true',
        doctors: [
            { name: "Dr. Jackson", specialty: "Urgent Care" },
            { name: "Dr. White", specialty: "Family Medicine" },
        ]
    }
];

const filteredLocations = useMemo(() => {
    return localLocations.filter(loc => {
        if (filter === 'all') return true;
        if (filter === 'inNetwork') return loc.inNetwork === 'true';
        if (filter === 'outOfNetwork') return loc.inNetwork === 'false';
        return false;
    });
}, [filter]);

    if (!constant) return null;

    return (
        <MapContainer center={[32.9859, -96.7503]} 
            zoom={13} style={{ height: "600px", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredLocations.map((loc) => (
                <Marker 
                    key={loc.popUp}
                    position={loc.position} 
                    icon={customIcon}
                    eventHandlers={{
                        click: () => onLocationSelect?.(loc),
                    }}
                >
                    <Popup>
                    {loc.popUp}
                    <div style={{fontWeight: 'bold', textAlign: 'center'}}>
                        {loc.inNetwork === 'true' ? 'In-Network' : 'Out-of-Network'}
                    </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}