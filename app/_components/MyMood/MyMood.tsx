import React from "react";
import styles from "./MyMood.module.css";

{/* hardcoded entry spot for potential mood entries for users */}
const MyMood: React.FC = () => (
    <div className={styles.container}>
        <h2 className={styles.heading}> My Mood  </h2> 


        <textarea className={styles.entry} placeholder="How are you feeling today?"/>
    </div>
);




export default MyMood;