'use client';

import React from 'react';
import styles from './fingerfractureform.module.css';
import { useRouter } from 'next/navigation';


const FingerFractureForm: React.FC = () => {
  const router = useRouter();

  const STORAGE_KEY = "procedureData";
  
  // States for tracking form inputs

  const [selectedFinger, setSelectedFinger] = React.useState<string[]>([]);
  const [selectedSegment, setSelectedSegment] = React.useState<string[]>([]);
  const [selectedPattern, setSelectedPattern] = React.useState<string[]>([]);

  const handleCheckBox = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prev) => {
      if (prev.includes(value)) {
        // if already selected, remove
        return prev.filter((item) => item !== value);
      } else {
        // If not selected, add
        return [...prev, value];
      }
    });
  };
  const handleSubmit = () => {
    // Add form validation here or possibly save in local storage

    const procedureData = {
      procedureType: "Phalanges Fracture",
      selections: {
        finger: selectedFinger,
        segment: selectedSegment,
        pattern: selectedPattern,
      },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(procedureData));
    
    // Nav back to cost page
    router.push('/cost');
  };

  return (
    <div className={styles["form-container"]}>
      <h3>Please answer the following questions:</h3>

      <div className={styles.question}>
        <label>Which finger is fractured?</label>
        <div className={styles.options}>
          <label><input type="checkbox" onChange={() => handleCheckBox('Thumb', setSelectedFinger)}/> Thumb</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Index', setSelectedFinger)}/> Index</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Middle', setSelectedFinger)}/> Middle</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Ring', setSelectedFinger)}/> Ring</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Little', setSelectedFinger)}/> Little</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Multiple', setSelectedFinger)}/> Multiple</label>
        </div>
      </div>

      <div className={styles.question}>
        <label>What segment of the finger is affected?</label>
        <div className={styles.options}>
          <label><input type="checkbox" onChange={() => handleCheckBox('Distal', setSelectedSegment)}/> Distal</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Middle Phalanx', setSelectedSegment)}/> Middle Phalanx</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Proximal Phalanx', setSelectedSegment)}/> Proximal Phalanx</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Metacarpal', setSelectedSegment)}/> Metacarpal</label>
        </div>
      </div>

      <div className={styles.question}>
        <label>What is the pattern of the fracture?</label>
        <div className={styles.options}>
          <label><input type="checkbox" onChange={() => handleCheckBox('Avulsion', setSelectedPattern)}/> Avulsion</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Transverse', setSelectedPattern)}/> Transverse</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Spiral', setSelectedPattern)}/> Spiral</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Oblique', setSelectedPattern)}/> Oblique</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Intra-articular', setSelectedPattern)}/> Intra-articular</label>
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


export default FingerFractureForm;
