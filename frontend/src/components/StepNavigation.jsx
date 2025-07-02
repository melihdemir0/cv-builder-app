import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./StepNavigation.module.css";

const steps = [1, 2, 3, 4, 5]; 

export default function StepNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentStep = parseInt(location.pathname.split("-")[1]);

  return (
    <div className={styles.container}>
      {steps.map((step) => {
        const isActive = currentStep === step;

        return (
          <div
            key={step}
            className={`${styles.step} ${isActive ? styles.active : ""}`}
            onClick={() => navigate(`/create/step-${step}`)}
          >
            <img src="/page_background.png" alt={`Adım ${step}`} className={styles.triangle} />
            <span className={styles.number}>{step}</span>
          </div>
        );
      })}
    </div>
  );
}
