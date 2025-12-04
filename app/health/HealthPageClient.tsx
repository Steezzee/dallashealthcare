import { useState } from "react";
import type { Location, Doctor } from "../_components/MyHealth_Map";
import type { CSSProperties } from "react";
import styles from './HealthPageClient.module.css'
import dynamic from "next/dynamic";

//window is not defined and deployment issues on Vercel if this isnt here, apparently.  Issue with serverside rendering when importing I spent way too long on
//if someone could help fix this, it would be a nice bonus.  Otherwise, DONT TOUCH
//code is based on rendering solution from here https://stackoverflow.com/questions/53139884/next-js-disable-server-side-rendering-on-some-pages
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

  return (  
    //top filtering part of the left tab
   <div style = {{
      marginTop: '20px',
      gap: '20px',
      display: 'flex',
    }}>
      <aside className = {styles.networkFilterBox}>
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
          <div
            style={{
              fontSize: "0.9rem",
              color: "#000000ff",
            }}
          >
            {selectedLocation ? (
              <>
                <div //a location is selected
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Selected: {selectedLocation.popUp}
                </div>
                <button
                  onClick={() => setShowDoctorModal(true)}
                  style={{
                    width: "100%",
                    background: "#4CAF50",
                    color: "white",
                    padding: "0.6rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: "6px",
                    marginTop: "0.5rem",
                  }}
                  title="View doctors at selected location"
                >
                  Schedule Appointment
                </button>
              </>
            ) : (  // a location is not selected
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: "0.75rem 0",
                  color: "#444",
                }}
              >
                Select a hospital to schedule an appointment
              </div>
            )}
          </div>
      </aside>
    <div className = {styles.mapBoxStyle}>
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
            className = {styles.doctorsWindow}
        >
        <div className = {styles.doctorsPopup}>
        <div className = {styles.doctorsSelectionArea}>
            <div>
                <div style={{ fontWeight: '600' }}>{location.popUp}</div>
                <div style={{ fontSize: '0.9rem', color: '#444' }}>
                    {location.inNetwork === 'true' ? 'In-Network' : 'Out-of-Network'}
            </div>
        </div>
        <button
            onClick={onClose} 
            className= {styles.clickOutBox}
            >
            &times;
            </button>
        </div>
            <div style={{ padding: '1rem', overflowY: 'auto' }}>
                <ul>
                    {location.doctors.map((doc: Doctor) => (
                        <li
                            key={`${doc.name}-${doc.specialty}`}
                            className = {styles.individualDoctor}
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
  const today = new Date().toISOString().split("T")[0];

  if (!open) return null;

  const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
        if (!date) return;

        if (date < today) {
          alert("You cannot select a past date for your appointment.");
          return;
        }
      
      onConfirm({ date, location: selectedLocation, doctor: selectedDoctor });
  };

  return (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className = {styles.doctorsWindow}
        >
          <div className = {styles.scheduleBox}>

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

            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Confirm your Appointment</h2>
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
                <label htmlFor="date">Select appointment date:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  id="date"
                  name="date"
                  min={today}
                  required
                  style={inputStyle}
                />

                <button
                  type="submit"
                  className={styles.submitButtonLarge}
                >
                  Schedule
                </button>
              </form>
        </div>
      </div>
  );
}