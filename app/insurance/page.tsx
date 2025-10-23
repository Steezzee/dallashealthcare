import Image from "next/image";
import UploadedDocuments from "../_components/UploadedDocuments";

export default function Insurance() {
  return (
    <div style = {{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <main 
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '2rem', // space between columns
        padding: '2rem',
        minHeight: '60vh',
        flex: 1
      }} 
      >
        <UploadedDocuments />
        <section>
          **PlaceHolder**

          <div> Upload New Document</div>
          <div> Enter Title</div>
          <div> Enter Case Number</div>
          <div> Enter Document Date </div>

          <div> UPLOAD </div>
        </section>
      </main>
    </div>
  );
}
