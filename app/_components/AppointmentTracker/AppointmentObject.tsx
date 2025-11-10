'use client';
import React, { useState, useEffect } from "react"; 
import AppointmentTracker, { Appointment } from "./AppointmentTracker";
import HealthPageClient from "../../health/HealthPageClient"
import {usePathname} from "next/navigation"

const initial: Appointment[] = [
    { label: "Dentist", date: "10/7/25" },
    { label: "PCP", date: "12/7/25" },
    { label: "Therapy", date: "11/11/25" },
    { label: "Psychiatrist", date: "10/7/25" },
];

const STORAGE_KEY = "appointments";

export default function Parent() {
    const [appointments, setAppointments] = useState<Appointment[]>(() => {
    if(typeof window === "undefined") return initial;
    try{
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) as Appointment[] : initial;
    } catch {
        return initial;
    }
});

    const pathname = usePathname();

    const addAppointment = (label: string, date: string) => {
        setAppointments(prev => {
            const newList = [...prev, { label, date }]
            try{
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
                window.dispatchEvent(new Event("appointment-updated"));
            } catch {}
            return newList;
        });
    };

    useEffect(() => {
        try{
        localStorage.setItem("appointments", JSON.stringify(appointments));
        } catch {}
    }, [appointments])

    return(
        <> 
            {pathname === "/" && <AppointmentTracker appointments={appointments} />}
            {pathname === "/health" && (<HealthPageClient addAppointment={addAppointment} />
        )}
        </>
    );
}