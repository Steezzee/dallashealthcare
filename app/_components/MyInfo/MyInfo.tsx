import React from "react";
import styles from "./MyInfo.module.css";
import { useRouter } from 'next/navigation';


const userInfo = {
    name: "Noah Ark",
    dob: "01/14/1991",
    insurances: ["Delta Dental" , "Blue Cross Blue Shield"],

};

const MyInfo: React.FC = () => {

  const router = useRouter();
  const clickInsurance = (insurance: string) => {
    router.push("/insurance")
  };
return(
    <div className={styles.container}>
      <h2 className={styles.heading}>My Information</h2>
  
      <div className={styles.allInfo}>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Name:</span>
          <span>{userInfo.name}</span>
        </div>
  

        <div className={styles.infoRow}>
          <span className={styles.label}>Date of Birth:</span>
          <span> {userInfo.dob} </span>
        </div>
  



        <div className={styles.infoRow}>
          <span style = {{ fontWeight: 600, }}> 
            Active Insurances:  </span>
        </div>
  
        {/*BCBS & Delta */}
          <div className={styles.insuranceList}>
            {userInfo.insurances.map((insurance, i) => (
              
              <div key={i} className={styles.insuranceCard} 
              onClick = {() =>clickInsurance(insurance)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "";
              }}
             > 
                {insurance} 
              </div>
            ))}


          </div>

      </div>
    </div>
);
};
  

export default MyInfo;