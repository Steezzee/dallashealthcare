'use client';

import React from 'react';
import styles from './ribfractureform.module.css';
import { useRouter } from 'next/navigation';


const RibFractureForm: React.FC = () => {
  const router = useRouter();

  const STORAGE_KEY = "procedureData";

  // State for tracking form inputs

  const [selectedRib, setSelectedRib] = React.useState<string[]>([]);
  const [selectedSide, setSelectedSide] = React.useState<string[]>([]);
  const [selectedPattern, setSelectedPattern] = React.useState<string[]>([]);

  const handleCheckBox = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>) => {
      setState((prev) => {
        if (prev.includes(value)) {
          // if already selected, remove
          return prev.filter((item) => item !== value);
        } else {
          // if not selected, add
          return [...prev, value];
        }
      })
    }

  const handleSubmit = () => {
    // Add form validation here or possibly save in local storage?
    const procedureData = {
      procedureType: "Rib Fracture",
      selections: {
        rib: selectedRib,
        side: selectedSide,
        pattern: selectedPattern,
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(procedureData));

    // navigate back to cost page
   
    router.push('/cost');
  };

  return (
    <div className={styles["form-container"]}>
      <h3>You have chosen <b>rib fracture.</b></h3>
      <h3>Please answer the following questions:</h3>

      <div className={styles.question}>
        <label>Which rib(s) are fractured?</label>
        <div className={styles.options}>
          <label><input type="checkbox" onChange={() => handleCheckBox('1-3', setSelectedRib)}/> 1-3 (upper)</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('4-10', setSelectedRib)}/> 4-10 (middle)</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('11-12', setSelectedRib)}/> 11-12(lower/floating)</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Multiple Levels', setSelectedRib)}/> Multiple Levels</label>
          
        </div>
      </div>

      <div className={styles.question}>
        <label>What side is fractures?</label>
        <div className={styles.options}>
          <label><input type="checkbox" onChange={() => handleCheckBox('Right', setSelectedSide)}/> Right</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Left', setSelectedSide)}/> Left</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Both', setSelectedSide)}/> Both</label>
        </div>
      </div>

      <div className={styles.question}>
        <label>What is the pattern of the fracture?</label>
        <div className={styles.options}>
          <label><input type="checkbox" onChange={() => handleCheckBox('Segmental', setSelectedPattern)}/> Segmental</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Transverse', setSelectedPattern)}/> Transverse</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Non-displaced', setSelectedPattern)}/> Non-displaced</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Oblique', setSelectedPattern)}/> Oblique</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Displaced', setSelectedPattern)}/> Displaced</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Comminuted', setSelectedPattern)}/> Comminuted</label>  
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
