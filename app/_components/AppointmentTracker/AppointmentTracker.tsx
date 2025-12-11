'use client';

import React, {useState} from "react";
import styles from "./AppointmentTracker.module.css";

export type Appointment = {
    label: string;
    date: string;
};

type Props = {
    appointments: Appointment[];
    onDelete?: (index: number) => void;
};

const modalOverlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const cancelButtonStyle: React.CSSProperties = {
    flex: 1,
    padding: "0.7rem",
    border: "none",
    backgroundColor: "#ccc",
    borderRadius: "6px",
    cursor: "pointer",
};

const deleteButtonStyle: React.CSSProperties = {
    flex: 1,
    padding: "0.7rem",
    border: "none",
    backgroundColor: "#CA425F",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
};

const deleteModalStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "2rem",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
};

export default function AppointmentTracker({ appointments, onDelete }: Props) {
    console.log("AppointmentTracker received:", appointments);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(
        null
  );


const openDeleteModal = (index: number) => {    
    setPendingDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPendingDeleteIndex(null);
  };

const confirmDelete = () => {
    if (pendingDeleteIndex !== null && onDelete) {
      onDelete(pendingDeleteIndex);
    }
    closeDeleteModal();
  };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>
                My Appointments
            </h2>
            {appointments.length === 0 && (
                <h2 className={styles.subheading}>
                    No appointments booked.
                </h2>
            )}
            <ul className={styles.list}>
                {appointments.map(({ label, date }, index) => (
                    <li className={styles.item} key={label + date}>
                        <input style = {{width:".6rem" }} className={styles.checkbox} />
                        <span className={styles.label}>
                            {label} - {date}
                        </span>
                        {onDelete && (<button 
                            type="button"
                            className={styles.deleteButton}
                            onClick={() => openDeleteModal(index)}>
                            Delete
                        </button>)}
                    </li>
                ))}
            </ul>

            {isDeleteModalOpen && (
        <div
          style={modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDeleteModal();
          }}
        >
          <div style={deleteModalStyle}>
                <h3>Are you sure you want to delete this appointment?</h3>
                <div
                style={{ display: "flex", marginTop: "1.5rem", gap: "1rem" }}
                >
                <button onClick={closeDeleteModal} style={cancelButtonStyle}>
                    Cancel
                </button>
                <button onClick={confirmDelete} style={deleteButtonStyle}>
                    Delete
                </button>
                </div>
                </div>
            </div>
            )}
        </div>
    );
}