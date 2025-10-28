import Image from "next/image";
import AppointmentTracker from '../app/_components/AppointmentTracker/AppointmentTracker';
import MyInfo from '../app/_components/MyInfo/MyInfo';
import MyFitness from '../app/_components/MyFitness/MyFitness';
import MyMood from '../app/_components/MyMood/MyMood';
import MyPrescriptions from "./_components/MyPrescriptions/MyPrescriptions";
import MyNotes from "./_components/MyNotes/MyNotes";


import { revalidatePath } from "@/node_modules/next/cache";
export default function Home() {
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
      <AppointmentTracker />
      <MyFitness />
      <MyMood />
      <MyNotes />


      
      {/* Uncomment and add these as you build more components */}
      {/* <PrescriptionsTracker /> */}
      {/* <HealthSummary /> */}
    </main>
  );
}