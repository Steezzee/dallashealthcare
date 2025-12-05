'use client';

import React from 'react';
import styles from './ribfractureform.module.css';
import { useRouter } from 'next/navigation';


const RibFractureForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = () => {
    // Add form validation here or possibly save in local storage
   
    router.push('/cost');
  };

  return (
    <div className={styles["form-container"]}>
      <h3>Please answer the following questions:</h3>

      <div className={styles.question}>
        <label>Which rib(s) are fractured?</label>
        <div className={styles.options}>
          <label><input type="checkbox" /> 1-3 (upper)</label>
          <label><input type="checkbox" /> 4-10 (middle)</label>
          <label><input type="checkbox" /> 11-12(lower/floating)</label>
          <label><input type="checkbox" /> Multiple Levels</label>
          
        </div>
      </div>

      <div className={styles.question}>
        <label>What side is fractures?</label>
        <div className={styles.options}>
          <label><input type="checkbox" /> Right</label>
          <label><input type="checkbox" /> Left</label>
          <label><input type="checkbox" /> Both</label>
        </div>
      </div>

      <div className={styles.question}>
        <label>What is the pattern of the fracture?</label>
        <div className={styles.options}>
          <label><input type="checkbox" /> Segmental</label>
          <label><input type="checkbox" /> Transverse</label>
          <label><input type="checkbox" /> Non-displaced</label>
          <label><input type="checkbox" /> Oblique</label>
          <label><input type="checkbox" /> Displaced</label>
          <label><input type="checkbox" /> Comminuted</label>  
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


export default RibFractureForm;
