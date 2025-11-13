'use client';

import React, { useState, useEffect } from "react"; 
import AppointmentTracker, { Appointment } from "./AppointmentTracker";
import HealthPageClient from "../../health/HealthPageClient"
import {usePathname} from "next/navigation"

//populate appointment list with initial appointments.  Comment in to debug
const initial: Appointment[] = [
    //{ label: "Dentist", date: "10/7/25" },
    //{ label: "PCP", date: "12/7/25" },
    //{ label: "Therapy", date: "11/11/25" },
    //{ label: "Psychiatrist", date: "10/7/25" },
];

//savng appointments between reloads
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
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
            return newList;
        });
    };

    useEffect(() => {
        localStorage.setItem("appointments", JSON.stringify(appointments));
    }, [appointments])

    const handleDelete = (index: number) => {
        setAppointments(list => {
            const updatedList = list.filter((_, i) => i !== index);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
            return updatedList;
        });
    };

    //remove out "/health" line to debug the list on the map page itself
    return(
        <> 
            {pathname === "/" && <AppointmentTracker appointments={appointments} onDelete={handleDelete}/>} 
            {pathname === "/health" && (<HealthPageClient addAppointment={addAppointment} />
        )}
        </>
    ); 
}