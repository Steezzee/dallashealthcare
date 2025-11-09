'use client';

import React from 'react';
import styles from './armfractureform.module.css';
import { useRouter } from 'next/navigation';


const ArmFractureForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = () => {
    // Add form validation here or possibly save in local storage
    router.push('/cost');
  };

  return (
    <div className={styles["form-container"]}>
      <h3>Please answer the following questions.</h3>

      <div className={styles.question}>
        <label>Which arm is fractured?</label>
        <div className={styles.options}>
          <label><input type="checkbox" /> Left Arm</label>
          <label><input type="checkbox" /> Right Arm</label>
          <label><input type="checkbox" /> Both Arms</label>
        </div>
      </div>

      <div className={styles.question}>
        <label>What was the arm fracture classified as by location?</label>
        <div className={styles.options}>
          <label><input type="checkbox" /> Proximal</label>
          <label><input type="checkbox" /> Mid-shaft</label>
          <label><input type="checkbox" /> Distal</label>
        </div>
      </div>

      <div className={styles.question}>
        <label>What was the arm fracture classified as by break?</label>
        <div className={styles.options}>
          {['Displaced', 'Non-Displaced', 'Intra-articular', 'Extra-articular', 'Transverse', 'Oblique', 'Spiral', 'Comminuted', 'Greenstick', 'Pathological'].map(item => (
            <label key={item}><input type="checkbox" /> {item}</label>
          ))}
        </div>
      </div>

      <button 
      type="button"
      className={styles["submit-btn"]}
      onClick={handleSubmit}
      >
        Submit
        </button>
    </div>
  );
};


export default ArmFractureForm;