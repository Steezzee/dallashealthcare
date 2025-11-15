'use client';

import Image from "next/image";
import MyInfo from '../_components/MyInfo/MyInfo';
import MyFitness from '../_components/MyFitness/MyFitness';
import MyMood from '../_components/MyMood/MyMood';
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        flexDirection: 'row',
        alignItems: 'start', //flex-start
        gap: '1.4rem 2rem', // space between columns
        padding: '2rem',
        margin: 0,
        minHeight: '80vh',
      }}
    >

      <MyInfo />
      <MyPrescriptions />
      <AppointmentObject />
      <MyFitness />
      <MyMood />
      <DoctorsNotes />

    </main>
  );
}