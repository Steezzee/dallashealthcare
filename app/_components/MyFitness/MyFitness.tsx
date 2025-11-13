import React from "react";
import styles from "./MyFitness.module.css";

const fitnessData = {
    weight: "176 lbs",
    goalWeight: "145 lbs",
    calories: "478 kcal",
    workoutsDone: 4,
    maxWorkouts: 7,
    steps: "6,424",
};


const MyFitness: React.FC = () => {
  const progress = (fitnessData.workoutsDone / fitnessData.maxWorkouts) * 100;

  return (


    <div className={styles.container}>
      <h2 className={styles.heading}>My Fitness</h2> 


      <ul className={styles.fitnessInfo}>
        
        <li className={styles.fitnessLine}>
          <span className={styles.label}>Current Weight:</span>
          <span>{fitnessData.weight}</span>
        </li>

        <li className={styles.fitnessLine}>
          <span className={styles.label}>Goal Weight:</span>
          <span>{fitnessData.goalWeight}</span>
        </li>

        <li className={styles.fitnessLine}>
          <span className={styles.label}>Calories Burned Today:</span>
          <span>{fitnessData.calories}</span>
        </li>

        <li className={styles.fitnessLine}>
          <span className={styles.label}>Daily Step Count:</span>
          <span>{fitnessData.steps}</span>
        </li>

        <li className={styles.fitnessLine}>
          <span className={styles.label}>Workouts This Week:</span>
          <span>

            {fitnessData.workoutsDone}/{fitnessData.maxWorkouts}
          </span>
        </li>

      </ul>

   {/*progress bar for workouts that week*/}
      <div className={styles.progressBar}>

          <div className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>

        </div>
    </div>
  );
};

export default MyFitness;
