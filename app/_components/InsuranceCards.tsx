import React from "react";
import styles from "./InsuranceCards.module.css";


type Insurance = {
  providerName: string;
  memberName: string;
  memberID: string;
  groupNumber: string;
  planType: string;
  phone: string;
};

const cardInfo: Insurance[] = [
  {
    providerName: "Blue Cross Blue Shield",
    memberName: "Noah Ark",
    memberID: "93718936",
    groupNumber: "7893",
    planType: "PPO",
    phone: "1-800-521-2227",
  },
  {
    providerName: "Delta Dental",
    memberName: "Noah Ark",
    memberID: "3629861",
    groupNumber: "9872",
    planType: "Dental Basic",
    phone: "1-888-335-8227",
  }
];


const InsuranceCards: React.FC = () => (
    <div className={styles.container}>
        <div className={styles.insuranceList}>
          {cardInfo.map((insurance, i) => (
            <div key={i} className={styles.insuranceCard}>
              <h3 className={styles.provider}>{insurance.providerName}</h3>
              <p><strong>Member:</strong> {insurance.memberName}</p>
              <p><strong>Member ID:</strong> {insurance.memberID}</p>
              <p><strong>Group #:</strong> {insurance.groupNumber}</p>
              <p><strong>Plan:</strong> {insurance.planType}</p>
              <p><strong>Phone:</strong> {insurance.phone}</p>
            </div>
          ))}
      </div>
    </div>
  );
  

export default InsuranceCards;
