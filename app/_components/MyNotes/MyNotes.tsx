import React from "react";
import styles from "./MyNotes.module.css";
{/*USED FOR DOCTORSNOTES.TSX */}

type Notes = {
    name:string;
    date:string;
    contents: string;
}

const notesData: Notes[] = [
    {
        name: "Widsom Teeth Referrals",
        date: "10/7/2025",
        contents: "Dr. Pacman..."
    },
    {
        name: "Albuterol Side Effects",
        date: "10/15/2025",
        contents: "Slight nausea..."
    },

];

const MyNotes: React.FC = () => (
    <div className={styles.container}>
        <h2 className={styles.heading}> My Notes  </h2> 
        
        <div className={styles.notesList}>
        {notesData.map((note, i) => (
          <div className={styles.noteCard} key={i}>
            <p><strong>Name :</strong> {note.name}</p>
            <p><strong>Date: </strong> {note.date}</p>
            <p><strong>Contents: </strong>{note.contents}</p>
          </div>
        ))}
      </div>

        <textarea
            className={styles.journal}
            placeholder="Add Note"
            />
            <button className={styles.saveButton}>Save Note</button>
    </div>
);

export default MyNotes;