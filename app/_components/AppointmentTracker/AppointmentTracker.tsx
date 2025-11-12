import React from "react";
import styles from "./AppointmentTracker.module.css";

export type Appointment = {
    label: string;
    date: string;
};

type Props = {
    appointments: Appointment[];
};

export default function AppointmentTracker({ appointments }: Props) {
    console.log("AppointmentTracker received:", appointments);
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>
                My Appointments
            </h2>
            <ul className={styles.list}>
                {appointments.map(({ label, date }) => (
                    <li className={styles.item} key={label + date}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span className={styles.label}>
                            {label} - {date}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}