'use client';

import React from 'react';
import styles from './skullfractureform.module.css';
import { useRouter } from 'next/navigation';


const SkullFractureForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = () => {
    // Add form validation here or possibly save in local storage
   
    router.push('/cost');
  };

  return (
    <div className={styles["form-container"]}>
      <h3>Please answer the following questions:</h3>

      <div className={styles.question}>
        <label>Which type of skull fracture is present?</label>
        <div className={styles.options}>
          <label><input type="checkbox" /> Linear</label>
          <label><input type="checkbox" /> Depressed</label>
          <label><input type="checkbox" /> Basilar</label>
          <label><input type="checkbox" /> Comminuted</label>
          <label><input type="checkbox" /> Compound</label>
        </div>
      </div>

      <div className={styles.question}>
        <label>What is the fracture located?</label>
        <div className={styles.options}>
          <label><input type="checkbox" /> Frontal Bone</label>
          <label><input type="checkbox" /> Parietal Bone</label>
          <label><input type="checkbox" /> Temporal Bone</label>
          <label><input type="checkbox" /> Occipital Bone</label>
          <label><input type="checkbox" /> Skull Base</label>
          <label><input type="checkbox" /> Cranial Vault</label>
          <label><input type="checkbox" /> Nasal Bone</label>
          <label><input type="checkbox" /> Orbital Floor</label>
          <label><input type="checkbox" /> Maxillary/Malar/Zygoma</label>
        </div>
      </div>

      <div className={styles.question}>
        <label>What is the pattern of the fracture?</label>
        <div className={styles.options}>
          <label><input type="checkbox" /> Linear</label>
          <label><input type="checkbox" /> Transverse</label>
          <label><input type="checkbox" /> Longitudinal</label>
          <label><input type="checkbox" /> Obliqud</label>
          <label><input type="checkbox" /> Multiple/Branched</label>
          <label><input type="checkbox" /> Fragmented</label>  
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


export default SkullFractureForm;