'use client';

import React from 'react';
import styles from './skullfractureform.module.css';
import { useRouter } from 'next/navigation';


const SkullFractureForm: React.FC = () => {
  const router = useRouter();

  const STORAGE_KEY = "procedureData";

  // state for handing form inputs

  const [selectedType, setSelectedType] = React.useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = React.useState<string[]>([]);
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
      });
    };
  

  const handleSubmit = () => {
    // Add form validation here or possibly save in local storage

    const procedureData = {
      procedureType: "Skull Fracture",
      selections: {
        type: selectedType,
        location: selectedLocation,
        pattern: selectedPattern,
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(procedureData));
   
    router.push('/cost');
  };

  return (
    <div className={styles["form-container"]}>
      <h3>You have chosen <b>skull fracture.</b></h3>
      <h3>Please answer the following questions:</h3>

      <div className={styles.question}>
        <label>Which type of skull fracture is present?</label>
        <div className={styles.options}>
          <label><input type="checkbox" onChange={() => handleCheckBox('Linear', setSelectedType)}/> Linear</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Depressed', setSelectedType)}/> Depressed</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Basilar', setSelectedType)}/> Basilar</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Comminuted', setSelectedType)}/> Comminuted</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Compound', setSelectedType)}/> Compound</label>
        </div>
      </div>

      <div className={styles.question}>
        <label>What is the fracture located?</label>
        <div className={styles.options}>
          <label><input type="checkbox" onChange={() => handleCheckBox('Frontal Bone', setSelectedLocation)}/> Frontal Bone</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Parietal Bone', setSelectedLocation)}/> Parietal Bone</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Temporal Bone', setSelectedLocation)}/> Temporal Bone</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Occipital Bone', setSelectedLocation)}/> Occipital Bone</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Skull Base', setSelectedLocation)}/> Skull Base</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Cranial Vault', setSelectedLocation)}/> Cranial Vault</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Nasal Bone', setSelectedLocation)}/> Nasal Bone</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Orbital Floor', setSelectedLocation)}/> Orbital Floor</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Maxillary/Malar/Zygoma', setSelectedLocation)}/> Maxillary/Malar/Zygoma</label>
        </div>
      </div>

      <div className={styles.question}>
        <label>What is the pattern of the fracture?</label>
        <div className={styles.options}>
          <label><input type="checkbox" onChange={() => handleCheckBox('Linear', setSelectedPattern)}/> Linear</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Transverse', setSelectedPattern)}/> Transverse</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Longitudinal', setSelectedPattern)}/> Longitudinal</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Obliqud', setSelectedPattern)}/> Obliqud</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Multiple/Branched', setSelectedPattern)}/> Multiple/Branched</label>
          <label><input type="checkbox" onChange={() => handleCheckBox('Fragmented', setSelectedPattern)}/> Fragmented</label>  
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