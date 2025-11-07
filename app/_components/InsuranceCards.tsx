import React from "react";
import styles from "./InsuranceCards.module.css";

type Insurance = {
  providerName: string;
  memberID: string;
  groupNumber: string;
  planType: string;
  phone: string;
};

const cardInfo: Insurance[] = [
  {
    providerName: "Blue Cross Blue Shield",
    memberID: "93718936",
    groupNumber: "7893",
    planType: "PPO",
    phone: "1-800-521-2227",
  },
  {
    providerName: "Delta Dental",
    memberID: "3629861",
    groupNumber: "9872",
    planType: "Dental Basic",
    phone: "1-888-335-8227",
  },
];

const InsuranceCards: React.FC = () => (
    <div className={styles.insuranceList}>
      {cardInfo.map((insurance, i) => (
        <div key={i} className={styles.insuranceCard}>
          <h4 className={styles.provider}>{insurance.providerName}</h4>
          <p>Member ID:{insurance.memberID}</p>
          <p>Group #: {insurance.groupNumber}</p>
          <p>Plan: {insurance.planType}</p>
          <p>Phone: {insurance.phone}</p>
        </div>
      ))}
    </div>
);

export default InsuranceCards;
