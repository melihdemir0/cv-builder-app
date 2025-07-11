import React from 'react';
import StepNavigation from '../components/StepNavigation';
import EducationForm from '../components/EducationForm';

const CvStep2 = () => {
  return (
    <div className="container mx-auto px-4">
  
      <EducationForm />

      <div className="mt-20">
        <StepNavigation />
      </div>
    </div>
  );
};

export default CvStep2;
