import React from "react";
import styles from "./MyMood.module.css";


const MyMood: React.FC = () => (
    <div className={styles.container}>
        <h2 className={styles.heading}> My Mood  </h2> 
        
        {/* emojis for mood identification */}
        <div className={styles.moodSelector}>
            {['😊', '😐', '😔', '😠', '😴', '😡'].map((emoji) => (
                <button key={emoji} className={styles.emojiButton}>
                    {emoji}
                </button>
            ))}
        </div>
        
        {/*field ask user how they are */}
        <textarea
            className={styles.entry}
            placeholder="How are you feeling today?"
            />
    </div>
);




export default MyMood;