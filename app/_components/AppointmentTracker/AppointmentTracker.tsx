import React from "react";
import styles from "./AppointmentTracker.module.css";

export type Appointment = {
    label: string;
    date: string;
};

type Props = {
    appointments: Appointment[];
    onDelete?: (index: number) => void;
};

export default function AppointmentTracker({ appointments, onDelete }: Props) {
    console.log("AppointmentTracker received:", appointments);
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
                {appointments.map(({ label, date }, number) => (
                    <li className={styles.item} key={label + date}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span className={styles.label}>
                            {label} - {date}
                        </span>
                        {onDelete && (<button 
                            type="button"
                            className={styles.deleteButton}
                            onClick={() => onDelete(number)}>
                            Delete
                        </button>)}
                    </li>
                ))}
            </ul>
        </div>
    );
}