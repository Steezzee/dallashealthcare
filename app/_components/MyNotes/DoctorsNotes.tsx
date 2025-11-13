import React from "react";
import styles from "./MyNotes.module.css";


type Notes = {
    name:string;
    date:string;
    contents: string;
}

const notesData: Notes[] = [
    {
        name: "Widsom Teeth Referrals",
        date: "10/7/2025",
        contents: "Do not eat solids for the next 24 hours."
    },
    {
        name: "Albuterol Side Effects",
        date: "10/15/2025",
        contents: "Slight nausea, shakiness, heartbeat.  Do not take caffeine"
    },

];

const DoctorsNotes: React.FC = () => (
    <div className={styles.container}>
        <h2 className={styles.heading}> Doctor's Notes  </h2> 
        
        <div className={styles.notesList}>
        {notesData.map((note, i) => (
          <div className={styles.noteCard} key={i}>
            <p><strong>Name :</strong> {note.name}</p>
            <p><strong>Date: </strong> {note.date}</p>
            <p><strong>Contents: </strong>{note.contents}</p>
          </div>
        ))}
      </div>
-    </div>
);

export default DoctorsNotes;