// src/pages/CvStep1.jsx
import React, { useState } from 'react';
import StepNavigation from "../components/StepNavigation";
import { useNavigate } from "react-router-dom";

export default function CvStep1() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    birthDate: '',
    aiIntro: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleNext = () => {
    navigate("/create/step-2");
  };

  return (
    <div>
      <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">1. Kişisel Bilgiler</h2>

        <div className="space-y-3">
          <input
            type="text"
            name="fullName"
            placeholder="Ad Soyad"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Adres"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Telefon"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={handleNext}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            İleri
          </button>
        </div>
        <>
        <div className="p-4 max-w-xl mx-auto">
        </div>
        <StepNavigation />  
    </>
      </div>
    </div>
  );
}
