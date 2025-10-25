import React from "react";
import styles from "./MyMood.module.css";



const MyMood: React.FC = () => (
    <div className={styles.container}>
        <h2 className={styles.heading}> My Mood  </h2> 
        
        <div className={styles.moodSelector}>
   
            {['😊', '😐', '😔', '😠', '😴', '😡'].map((emoji) => (
                <button
                 key={emoji} className={styles.emojiButton}>
                    {emoji}
                </button>
            ))}
        </div>

        <textarea
            className={styles.journal}
            placeholder="How are you feeling today?"
            />
            <button className={styles.saveButton}>Save Entry</button>
    </div>
);

export default MyMood;