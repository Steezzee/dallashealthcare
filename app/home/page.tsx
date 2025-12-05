'use client';

import Image from "next/image";
import MyInfo from '../_components/MyInfo/MyInfo';
import MyPrescriptions from "../_components/MyPrescriptions/MyPrescriptions";
import DoctorsNotes from "../_components/MyNotes/DoctorsNotes";
import AppointmentObject from "../_components/AppointmentTracker/AppointmentObject";
import { useEffect } from 'react';
import { revalidatePath } from "@/node_modules/next/cache";
import { useRouter } from 'next/navigation';


export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInUser");
    if (!loggedIn) {
      router.push('/auth/login?from=' + encodeURIComponent('/'));
    }
  }, []);

  return (
    <main
      style={{
        display: 'grid', //flex
        //gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gridTemplateColumns: 'repeat(2, minmax(350px, 1fr))',
        flexDirection: 'row',
        alignItems: 'start', //flex-start
        gap: '2rem 3rem', // space between columns
        padding: '2rem',
        margin: 0,
        minHeight: '80vh',
        backgroundColor: '#D5EBE3',
      }}
    >

        <MyInfo />
        <AppointmentObject />
        <MyPrescriptions />
        <DoctorsNotes />

    </main>
  );
}