import React from "react";
import styles from "./AppointmentTracker.module.css";

// Might need to add Props here to pass in actual appointments through hardcoded database
const appointments = [
    { label: "Dentist", date: "10/7/25" },
    { label: "PCP", date: "12/7/25" },
    { label: "Therapy", date: "11/11/25" },
    { label: "Psychiatrist", date: "10/7/25" },
];

const AppointmentTracker: React.FC = () => (
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

export default AppointmentTracker;