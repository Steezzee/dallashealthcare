import React from "react";
import styles from "./MyPrescriptions.module.css";


type Prescription = {
    name:string;
    dosage:string;
    frequency: string;
    doctor: string;
    pharmacy: string;

}
const prescriptionsData: Prescription[] = [
    {
        name: "Amoxicillan",
        dosage: "500 mg/8hrs",
        frequency: "1 tablet",
        doctor: "Dr. George",
        pharmacy: "Walgreens"
    },

    {
        name: "Albuterol",
        dosage: "2.5 mg",
        frequency: "2-3 times/day",
        doctor: "Dr. Smith",
        pharmacy: "Walgreens" 
    },

];


const MyPrescriptions: React.FC = () => (
    <div className={styles.container}>

      <h2 className={styles.heading}>My Prescriptions</h2>
  
        <div className={styles.prescriptionList}>
          {prescriptionsData.map((prescription, i) => (

            <div className={styles.prescriptionCard} key={i}>

              <p><strong>Name: </strong> {prescription.name}</p>
              <p><strong>Dosage: </strong> {prescription.dosage}</p>
              <p><strong>Frequency: </strong> {prescription.frequency}</p>
              <p><strong>Doctor: </strong> {prescription.doctor}</p>
              <p><strong>Pharmacy: </strong> {prescription.pharmacy}</p>


            </div>
          ))}
        </div>
    </div>
  );

export default MyPrescriptions;