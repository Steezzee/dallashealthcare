'use client';

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Location } from "../_components/MyHealth_Map";

const MyHealth_Map = dynamic(
  () => import("../_components/MyHealth_Map").then(m => m.default),
  { ssr: false, loading: () => <div style={{ height: 600 }}>Loading map…</div> }
);

export default function HealthPage() {
  const [filter, setFilter] = useState<'all' | 'inNetwork' | 'outOfNetwork'>('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  return (  
   <div style = {{
      marginTop: '20px',
      gap: '20px',
      display: 'flex',
      flexDirection: 'row',
      minHeight: '100vh'
    }}>
      <aside style={{
        width: '280px',
        border: '1px solid #ddd',
        padding: '.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        background: '#f9f9f9',  
        top: 72,
        height: '600px',
      }}>
        <h2 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Filter Locations by:</h2>
        <fieldset style={{ border: 'none', padding: 0 }}>
          <legend style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Network Status</legend>

          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            <input
              type="radio"
              name="networkFilter"
              value="all"
              checked={filter === 'all'}
              onChange={() => setFilter('all')}
              style={{ marginRight: '0.5rem' }}
            />
            All Locations
          </label>

          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            <input
              type="radio"
              name="networkFilter"
              value="inNetwork"
              checked={filter === 'inNetwork'}
              onChange={() => setFilter('inNetwork')}
              style={{ marginRight: '0.5rem' }}
            />
            In-Network only
          </label>

          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            <input
              type="radio"
              name="networkFilter"
              value="outOfNetwork"
              checked={filter === 'outOfNetwork'}
              onChange={() => setFilter('outOfNetwork')}
              style={{ marginRight: '0.5rem' }}
            />
            Out-of-Network only
          </label>
        </fieldset>

        <div style={{ 
          marginTop: '2rem', 
          fontSize: '0.9rem', 
          color: '#000000ff' }}>
          <div
            style={{ 
              fontWeight: 'bold',
              fontSize: '1rem',
              marginBottom: 8,
              minHeight: 18,
            }}>
            {selectedLocation ? `Selected: ${selectedLocation.popUp}` : 'No location selected'}
          </div>
          <button
            disabled={!selectedLocation}
            onClick={() => selectedLocation && setShowDoctorModal(true)}
            style={{
              width: '100%',
              background: selectedLocation ? '#4CAF50' : '#888',
              color: 'white',
              padding: '0.6rem',
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              border: 'none',
              borderRadius: '6px',
            }}
            title={selectedLocation ? "View doctors at selected location" : "Select a location to view doctors"}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#ACCCC1")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                selectedLocation ? '#4CAF50' : '#888')
            }
          >
            View Doctors
          </button>
        </div>
      </aside>
    <div 
      style={{
        marginTop: '10px',
        width: '1200px',
        height: '600px',
        aspectRatio: '1 / 1',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: '1px',
       }} 
      >
        <MyHealth_Map  
          filter={filter} 
          onLocationSelect={(location) => {
            setSelectedLocation(location);
          }}
        />
        </div>
        {showDoctorModal && selectedLocation && (
          <DoctorModal 
            location={selectedLocation}
            onClose={() => setShowDoctorModal(false)}
          />
        )}
      </div>
  );
}

function DoctorModal({ 
  location, 
  onClose, 
}: { 
  location: Location; 
  onClose: () => void }) {
    return (
        <div
            onClick={(click) => click.target === click.currentTarget && onClose()}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                padding: '1rem',
            }}
        >
        <div
            style={{
                backgroundColor: '#ffffffff',
                borderRadius: '12px',
                width: "min(400px, 90vw)",
                maxHeight: '80vh',
                overflowY: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
        <div
            style={{
                padding: '1rem',
                borderBottom: '1px solid #444',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '.75rem',
            }}
        >
            <div>
                <div style={{ fontWeight: '600' }}>{location.popUp}</div>
                <div style={{ fontSize: '0.9rem', color: '#444' }}>
                    {location.inNetwork === 'true' ? 'In-Network' : 'Out-of-Network'}
            </div>
        </div>
        <button
            onClick={onClose}
            aria-label="Close Doctor List"
            style={{
                background: 'transparent',
                border: 'none',
                color: '#444',
                fontSize: '1.5rem',
                cursor: 'pointer',
                lineHeight: 1,
                padding: ".1rem .5rem",
                }}
            >
            &times;
            </button>
        </div>
            <div style={{ padding: '1rem', overflowY: 'auto' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {location.doctors.map((doc) => (
                        <li
                            key={`${doc.name}-${doc.specialty}`}
                            style={{
                                marginBottom: '0.75rem',
                                border: '1px solid #444',
                                borderRadius: '8px',
                                padding: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: '500' }}>{doc.name}</div>
                                <div style={{ fontSize: '0.9rem', color: '#444' }}>
                                    {doc.specialty}
                                </div>
                            </div>
                        <button
                            style={{
                                background: '#4CAF50',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 6,
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                marginLeft: 'auto',
                            }}
                            onClick={() => console.log("Add Appointment", location.popUp, doc)}
                        >
                            Schedule Appointment
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    );
}