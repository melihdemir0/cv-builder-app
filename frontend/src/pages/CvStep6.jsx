import React from "react";
import StepNavigation from "../components/StepNavigation";
import CvPreview from "../components/CvPreview";
import { useCvForm } from "../context/CvFormContext";

export default function CvStep6() {
  const { formData } = useCvForm();

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <CvPreview
        personalInfo={{
          fullName: formData.fullName,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          birthDate: formData.birthDate,
          photo: formData.photo,
        }}
        educationList={formData.educations}
        experienceList={formData.experiences}
        languageList={formData.languages}
        aiIntro={formData.aiIntro}
      />

      <div className="mt-10">
        <StepNavigation />
      </div>
    </div>
  );
}
