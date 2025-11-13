'use client';

import React from 'react';
import styles from './fingerfractureform.module.css';
import { useRouter } from 'next/navigation';


const FingerFractureForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = () => {
    // Add form validation here or possibly save in local storage
    router.push('/cost');
  };

  return (
    <div className={styles["form-container"]}>
      <h3>Please answer the following questions:</h3>

      <div className={styles.question}>
        <label>Which finger is fractured?</label>
        <div className={styles.options}>
          <label><input type="checkbox" /> Thumb</label>
          <label><input type="checkbox" /> Index</label>
          <label><input type="checkbox" /> Middle</label>
          <label><input type="checkbox" /> Ring</label>
          <label><input type="checkbox" /> Little</label>
          <label><input type="checkbox" /> Multiple</label>
        </div>
      </div>

      <div className={styles.question}>
        <label>What segment of the finger is affected?</label>
        <div className={styles.options}>
          <label><input type="checkbox" /> Distal</label>
          <label><input type="checkbox" /> Middle Phalanx</label>
          <label><input type="checkbox" /> Proximal Phalanx</label>
          <label><input type="checkbox" /> Metacarpal</label>
        </div>
      </div>

      <div className={styles.question}>
        <label>What is the pattern of the fracture?</label>
        <div className={styles.options}>
          <label><input type="checkbox" /> Avulsion</label>
          <label><input type="checkbox" /> Transverse</label>
          <label><input type="checkbox" /> Spiral</label>
          <label><input type="checkbox" /> Oblique</label>
          <label><input type="checkbox" /> Intra-articular</label>
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


export default FingerFractureForm;
