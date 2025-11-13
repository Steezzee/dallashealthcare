"use client";

import React, { useState } from "react";
import styles from "./InsuranceCards.module.css";

type Insurance = {
  providerName: string;
  memberID: string;
  groupNumber: string;
  planType: string;
  phone: string;
  address: string;
  coverageDetails: string;
  member: string;
  dependents: string;
};

const cardInfo: Insurance[] = [
  {
    providerName: "Blue Cross Blue Shield",
    memberID: "93718936",
    groupNumber: "7893",
    planType: "PPO",
    phone: "1-800-521-2227",
    address: "123 Blue St, Dallas, TX 75201",
    coverageDetails:
      "Covers 80% for in-network care, 60% out-of-network. Includes ER and preventive services.",
    member: "Noah Ark",
    dependents: "Grace Ark, Nolan Ark, Noel Ark",
  },
  {
    providerName: "Delta Dental",
    memberID: "3629861",
    groupNumber: "9872",
    planType: "Dental Basic",
    phone: "1-888-335-8227",
    address: "500 Smile Ave, Irving, TX 75063",
    coverageDetails:
      "Covers 100% for preventive cleanings and 50% for major dental procedures.",
    member: "Noah Ark",
    dependents: "Grace Ark, Nolan Ark, Noel Ark",

  },

];

const InsuranceCards: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<Insurance | null>(null);

  return (
    <>
      <div className={styles.container}>

        <div className={styles.insuranceList}>
          {cardInfo.map((insurance, i) => (
            <div
              key={i}
              className={styles.insuranceCard}
              onClick={() => setSelectedCard(insurance)}
            >
              <h4 className={styles.provider}>{insurance.providerName}</h4>
              <p><strong>Member ID: </strong> {insurance.memberID}</p>
              <p><strong>Group #: </strong>  {insurance.groupNumber}</p>
              <p><strong>Plan: </strong>{insurance.planType}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCard && (
        <div className={styles.modalOverlay} onClick={() => setSelectedCard(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <span className={styles.close} onClick={() => setSelectedCard(null)}>
              &times;
            </span>
            <h4 className={styles.provider}>{selectedCard.providerName}</h4>
            <p><strong>Member:</strong> {selectedCard.member}</p>
            <p><strong>Dependents:</strong> {selectedCard.dependents}</p>
            <p><strong>Member ID:</strong> {selectedCard.memberID}</p>
            <p><strong>Group #:</strong> {selectedCard.groupNumber}</p>
            <p><strong>Plan:</strong> {selectedCard.planType}</p>
            <p><strong>Phone:</strong> {selectedCard.phone}</p>
            <p><strong>Medical Claims Address:</strong> {selectedCard.address}</p>
            <p><strong>Coverage:</strong> {selectedCard.coverageDetails}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default InsuranceCards;
