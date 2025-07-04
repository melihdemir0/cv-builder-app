import React from "react";
import StepNavigation from "../components/StepNavigation";

export default function CvStep6() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">Şablon Seçiniz</h1>
      <div className="flex justify-center mt-10">
        <StepNavigation />
      </div>
    </div>
  );
}