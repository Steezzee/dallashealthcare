'use client';

import { useState } from "react";
import dynamic from "next/dynamic";

const MyHealth_Map = dynamic(
  () => import("../_components/MyHealth_Map").then(m => m.default),
  { ssr: false, loading: () => <div style={{ height: 600 }}>Loading map…</div> }
);

export default function HealthPage() {
  const [filter, setFilter] = useState<'all' | 'inNetwork' | 'outOfNetwork'>('all');

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
      </aside>
    <div style={{
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
        <MyHealth_Map  filter={filter} />
        </div>
    </div>
  );
}
