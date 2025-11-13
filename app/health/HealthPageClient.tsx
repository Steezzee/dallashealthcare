import { useState } from "react";
import type { Location, Doctor } from "../_components/MyHealth_Map";
import type { CSSProperties } from "react";
import { useRouter } from "next/navigation"
import styles from './HealthPageClient.module.css'
import dynamic from "next/dynamic";

//window is not defined and deployment issues on Vercel if this isnt here, apparently.
const MyHealth_Map = dynamic(
  () => import("../_components/MyHealth_Map").then(m => m.default),
  { ssr: false }
);

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "1rem",
  marginTop: "0.5rem",
};

export default function HealthPageClient({
  addAppointment,
}: {
  addAppointment?: (label: string, date: string) => void // not sure if the maybe is needed but it works, dont delete unless fixed issue
}) {
  const [filter, setFilter] = useState<'all' | 'inNetwork' | 'outOfNetwork'>('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false); //is the 1st apppointment popup open?
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);  //is the 2nd apppointment popup open?
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const router = useRouter();

  return (  
    //top filtering part of the left tab
   <div style = {{
      marginTop: '20px',
      gap: '20px',
      display: 'flex',
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
        <fieldset>
          <legend style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Network Status:</legend>

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

        <div style={{  //dealing with showing selected clinics and selecting 
          fontSize: '0.9rem', 
          color: '#000000ff' }}>
          <div
            style={{ 
              fontWeight: 'bold',
              fontSize: '1rem',
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
              borderRadius: '6px', 
            }} 
            title={selectedLocation ? "View doctors at selected location" : "Select a location to view doctors"}
          >
            Schedule Appointment
          </button>
        </div>
      </aside>
    <div 
      style={{
        marginTop: '10px',
        width: '1200px',
        height: '600px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'stretch',
        padding: '1px',
       }} 
      >
        <MyHealth_Map   //open health map on general page
          filter={filter} 
          onLocationSelect={(location: Location) => {
            setSelectedLocation(location);
          }}
        />
        </div>
        {showDoctorModal && selectedLocation && (
          <DoctorModal //open the list of doctors for clinic
            location={selectedLocation}
            onClose={() => setShowDoctorModal(false)}
            onSchedule={(doctor) => {
              setSelectedDoctor(doctor);
              setIsScheduleOpen(true);
            }}
          />
        )}
          <ScheduleModal //open a field to input date to schedule appointments after slecting doctor
            open={isScheduleOpen}
            onClose={() => setIsScheduleOpen(false)}
            selectedLocation={selectedLocation}
            selectedDoctor={selectedDoctor}
            onConfirm={(payload) => {
              if(payload.location && payload.doctor){  //cancatenate location, name, and specialty in one "label" string then send to addAppointment
                const label = `${payload.doctor.name} - ${payload.doctor.specialty} at ${payload.location.popUp}`;
                addAppointment?.(label, payload.date)
              }
              console.log('test payload', payload);
              setIsScheduleOpen(false);
              setShowDoctorModal(false);
              setSelectedDoctor(null);
            }}
          />
      </div>
  );
}

/* modal window to select doctor from hospital*/
function DoctorModal({ 
  location, 
  onClose,
  onSchedule,
}: { 
  location: Location;
  onClose: () => void;
  onSchedule: (doctor: Doctor) => void;
}) {
    return (
        <div
            onClick={(click) => click.target === click.currentTarget && onClose()}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#000000aa',
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
                    {location.doctors.map((doc: Doctor) => (
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
                                <div style={{ fontWeight: '500' }}>
                                  {doc.name}</div>
                                <div style={{ fontSize: '0.9rem', color: '#444' }}>
                                    {doc.specialty}</div>
                            </div>
                        <button
                            className = {styles.submitButtons}
                            onClick={() => onSchedule(doc)}
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


/* modal to scheduling an appointment with a selcted doctor (date)*/
function ScheduleModal({
  open,
  onClose,
  selectedLocation,
  selectedDoctor,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  selectedLocation: Location | null;
  selectedDoctor: Doctor | null;
  onConfirm: (payload: {date: string; location: Location | null; doctor: Doctor | null}) => void;
}) {
  const [date, setDate] = useState("");

  if (!open) return null;

  const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      onConfirm({ date, 
        location: selectedLocation, doctor: selectedDoctor });
  };

  return (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000000ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              padding: "2rem",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 4px 10px rgba(0,,0,0.1)",
            }}
          >

            <span
              onClick={() => onClose()}
              style={{
                float: "right",
                cursor: "pointer",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              &times;
            </span>

            <h2 style={{ textAlign: "center" }}>Confirm your Appointment</h2>
            <div style={{ marginTop: "1rem", fontSize: "1rem" }}>
              <p>
                <strong>Location:</strong>{" "}
                {selectedLocation ? selectedLocation.popUp : "N/A"}
              </p>
              <p>
                <strong>Doctor:</strong>{" "}
                {selectedDoctor ? `${selectedDoctor.name} (${selectedDoctor.specialty})` : "N/A"}
              </p>
            </div>
              <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
              <label htmlFor="date">Date (MM/DD/YYYY):</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                id="date"
                name="date"
                placeholder="MM/DD/YYYY"
                required
                pattern="\d{2}/\d{2}/\d{4}"
                style={inputStyle}
              />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.8rem",
                backgroundColor: "#30a05f",
                color: "white",
                border: "none",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              Schedule
            </button>
            </form>
        </div>
      </div>
  );
}