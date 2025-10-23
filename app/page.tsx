import Image from "next/image";
import AppointmentTracker from '../app/_components/AppointmentTracker/AppointmentTracker';
import UploadedDocuments from "./_components/UploadedDocuments";
export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '2rem', // space between columns
        padding: '2rem',
        minHeight: '80vh'
      }}
    >
      <UploadedDocuments />
      <AppointmentTracker />
      
      {/* Uncomment and add these as you build more components */}
      {/* <PrescriptionsTracker /> */}
      {/* <HealthSummary /> */}
    </main>
  );
}
