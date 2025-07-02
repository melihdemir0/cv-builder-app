import React from 'react';
import StepNavigation from '../components/StepNavigation';
import EducationForm from '../components/EducationForm';

const CvStep2 = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">Eğitim Bilgileri</h1>

      <EducationForm />

      <div className="mt-20">
        <StepNavigation />
      </div>
    </div>
  );
};

export default CvStep2;
