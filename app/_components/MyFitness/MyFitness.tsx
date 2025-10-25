import React from "react";
import styles from "./MyFitness.module.css";

const fitnessData = {
    weight: "156 lbs",
    goalWeight: "135 lbs",
    calories: "478 kcal",
    workoutsDone: 6,
    maxWorkouts: 7,
    steps: "6,424",
};


const MyFitness: React.FC = () => {
  const progress =
    (fitnessData.workoutsDone / fitnessData.maxWorkouts) * 100;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Fitness</h2>

      <ul className={styles.infoSection}>
        <li className={styles.infoRow}>
          <span className={styles.label}>Current Weight:</span>
          <span>{fitnessData.weight}</span>
        </li>

        <li className={styles.infoRow}>
          <span className={styles.label}>Goal Weight:</span>
          <span>{fitnessData.goalWeight}</span>
        </li>

        <li className={styles.infoRow}>
          <span className={styles.label}>Calories Burned Today:</span>
          <span>{fitnessData.calories}</span>
        </li>

        <li className={styles.infoRow}>
          <span className={styles.label}>Daily Step Count:</span>
          <span>{fitnessData.steps.toLocaleString()}</span>
        </li>

        <li className={styles.infoRow}>
          <span className={styles.label}>Workouts This Week:</span>
          <span>
            {fitnessData.workoutsDone}/{fitnessData.maxWorkouts}
          </span>
        </li>
      </ul>

      <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
    </div>
  );
};

export default MyFitness;
