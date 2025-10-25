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
  
      <div className={styles.infoSection}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Name:</span>
          <span className={styles.value}>{userInfo.name}</span>
        </div>
  
        <div className={styles.infoRow}>
          <span className={styles.label}>Date of Birth:</span>
          <span className={styles.value}>{userInfo.dob}</span>
        </div>
  
        <div className={styles.infoRow}>
          <span className={styles.label}>Active Insurances:</span>
        </div>
  
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