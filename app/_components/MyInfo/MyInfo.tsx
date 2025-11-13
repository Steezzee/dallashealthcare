import React from "react";
import styles from "./MyInfo.module.css";

const userInfo = {
    name: "Noah Ark",
    dob: "01/14/1991",
    insurances: ["Delta Dental" , "Blue Cross Blue Shield"],

};

const MyInfo: React.FC = () => (

    <div className={styles.container}>
      <h2 className={styles.heading}>My Information</h2>
  
      <div className={styles.allInfo}>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Name:</span>
          <span>{userInfo.name}</span>
        </div>
  
        <div className={styles.infoRow}>
          <span className={styles.label}>Date of Birth:</span>
          <span>{userInfo.dob}</span>
        </div>
  
        <div className={styles.infoRow}>
          <span>Active Insurances:</span>
        </div>
  
        {/* List of insurances (BCBS & Delta) */}
        <div className={styles.insuranceList}>
          {userInfo.insurances.map((insurance, i) => (
            
            <div key={i} className={styles.insuranceCard}>
              {insurance}
            </div>
          ))}
        </div>


      </div>
    </div>
  );
  

export default MyInfo;