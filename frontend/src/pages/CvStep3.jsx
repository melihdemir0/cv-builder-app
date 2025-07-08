import React from 'react';
import StepNavigation from '../components/StepNavigation';
import ExperienceForm from '../components/ExperienceForm';

const CvStep3 = () => {
  return (
    <div className="container mx-auto px-4">

      <ExperienceForm />
      
      <div className="mt-20">
        <StepNavigation />
      </div>
    </div>
  );
};

export default CvStep3;
