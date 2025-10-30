import Image from "next/image";
import UploadedDocuments from "../_components/UploadedDocuments";
import MyHealth_Map from "../_components/MyHealth_Map";


export default function HealthPage() {
  return (
   <div style = {{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <main style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '2rem', // space between columns
        padding: '2rem',
        minHeight: '30vh',
        flex: 1
      }} 
      >
    <div style={{
        width: '900px',
        height: '300px',
        borderRadius: '8px',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    ></div>
        <MyHealth_Map 
        />
      </main>
    </div>
  );
}
