'use client';

import React from 'react';
import styles from './armfractureform.module.css';
import { useRouter } from 'next/navigation';


const ArmFractureForm: React.FC = () => {
  const router = useRouter();

  const STORAGE_KEY = "procedureData";

  // states to track input from fomr

  const [selectedArm, setSelectedArm] = React.useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = React.useState<string[]>([]);
  const [selectedClassification, setSelectedClassification] = React.useState<string[]>([]);

  const handleCheckBox = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prev) => {
      if (prev.includes(value))
      {
        // if already selected, remove
        return prev.filter((item) => item !== value);
      }
      else {
        // If not selected, add
        return [...prev, value];
      }
    } );
  }
  

  const handleSubmit = () => {
    // Add form validation here or possibly save in local storage

    const procedureData = {
      procedureType: "Arm Fracture",
      selections: {
        arm: selectedArm,
        location: selectedLocation,
        classification: selectedClassification,
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(procedureData));
   
    router.push('/cost');
  };

  return (
    <div className={styles["form-container"]}>
      <h3>Please answer the following questions.</h3>

      <div className={styles.question}>
        <label>Which arm is fractured?</label>
        <div className={styles.options}>
          <label><input type="checkbox" onChange={() => handleCheckBox('Left Arm', setSelectedArm)}/> Left Arm</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Right Arm', setSelectedArm)}/> Right Arm</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Both Arm', setSelectedArm)}/> Both Arms</label>
        </div>
      </div>

      <div className={styles.question}>
        <label>What is the location of the arm fracture?</label>
        <div className={styles.options}>
          <label><input type="checkbox" onChange={() => handleCheckBox('Proximal', setSelectedLocation)}/> Proximal</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Mid-shaft', setSelectedLocation)}/> Mid-shaft</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Distal', setSelectedLocation)}/> Distal</label>
        </div>
      </div>

      <div className={styles.question}>
        <label>What type of break is the arm fracture?</label>
        <div className={styles.options}>
          {['Displaced', 'Non-Displaced', 'Intra-articular', 'Extra-articular', 'Transverse', 'Oblique', 'Spiral', 'Comminuted', 'Greenstick', 'Pathological'].map(item => (
            <label key={item}><input type="checkbox" onChange={() => handleCheckBox(`${item}`, setSelectedClassification)}/> {item}</label>
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