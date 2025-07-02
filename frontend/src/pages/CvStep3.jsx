import React from 'react';
import StepNavigation from '../components/StepNavigation';
import ExperienceForm from '../components/ExperienceForm';

const CvStep3 = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">Deneyim Bilgileri</h1>

      <ExperienceForm />

      <div className="mt-20">
        <StepNavigation />
      </div>
    </div>
  );
};

export default CvStep3;
