// src/context/CvFormContext.jsx
import React, { createContext, useState, useContext } from "react";

const CvFormContext = createContext();

export const CvFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    address: '',
    phone: '',
    email: '',
    birthDate: '',
    photo: null,

    // Step 2
    educations: [],

    // Step 3
    experience: [],

    // Step 4
    languages: [],

    // Step 5
    aiIntro: '',
    templateId: null,
  });

  return (
    <CvFormContext.Provider value={{ formData, setFormData }}>
      {children}
    </CvFormContext.Provider>
  );
};

export const useCvForm = () => useContext(CvFormContext);
