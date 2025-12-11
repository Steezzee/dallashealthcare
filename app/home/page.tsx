'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const MyInfo = dynamic(() => import('../_components/MyInfo/MyInfo'), { ssr: false });
const MyPrescriptions = dynamic(() => import("../_components/MyPrescriptions/MyPrescriptions"), { ssr: false });
const DoctorsNotes = dynamic(() => import("../_components/MyNotes/DoctorsNotes"), { ssr: false });
const AppointmentObject = dynamic(() => import("../_components/AppointmentTracker/AppointmentObject"), { ssr: false });


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