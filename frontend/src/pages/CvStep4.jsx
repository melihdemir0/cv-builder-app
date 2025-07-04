import React, { useState } from 'react';
import StepNavigation from '../components/StepNavigation';
import LanguageForm from '../components/LanguageForm';

const CvStep4 = () => {
  return (
    <div className="container mx-auto px-4">
  
      <LanguageForm />

      <div className="mt-20">
        <StepNavigation />
      </div>
    </div>
  );
};
export default CvStep4;