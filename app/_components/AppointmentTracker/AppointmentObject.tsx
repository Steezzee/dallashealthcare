'use client';
import React, { useState } from "react"; 
import AppointmentTracker, { Appointment } from "./AppointmentTracker";

const initial: Appointment[] = [
    { label: "Dentist", date: "10/7/25" },
    { label: "PCP", date: "12/7/25" },
    { label: "Therapy", date: "11/11/25" },
    { label: "Psychiatrist", date: "10/7/25" },
];

export default function Parent() {
    const [appointments, setAppointments] = useState<Appointment[]>(initial);

    const addAppointment = (label: string, date: string) => {
        setAppointments(prev => [...prev, { label, date }]);
    };

    return(
        <> 
            <AppointmentTracker appointments={appointments} />
        </>
    );
}