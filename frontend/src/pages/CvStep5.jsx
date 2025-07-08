// src/pages/CvStep5.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import StepNavigation from "../components/StepNavigation";
import { useCvForm } from '../context/CvFormContext';

export default function CvStep5() {
  const { formData, setFormData } = useCvForm(); // ✅ düzeltme burada
  const [introText, setIntroText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const generateIntro = async () => {
    setLoading(true);
    setError("");

    const school =
      formData.educations && formData.educations.length > 0
        ? formData.educations.map(e => e.schoolName).join(", ")
        : "";

    const experience =
      formData.experiences && formData.experiences.length > 0
        ? formData.experiences.map(e => e.title).join(", ")
        : "";

    try {
      const res = await fetch("http://localhost:8080/api/cv/generate-ai-intro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          school,
          experience,
          profession: formData.jobTitle || ""
        })
      });

      if (!res.ok) throw new Error("Sunucu hatası");
      const data = await res.json();
      setIntroText(data.intro);
    } catch (err) {
      console.error(err);
      setError("❌ Tanıtım metni oluşturulamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData && formData.fullName && formData.educations && formData.experiences) {
      generateIntro();
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setIntroText(e.target.value);
  };

  const handleNext = (e) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      aiIntro: introText // ✅ context'e kaydediyoruz
    }));

    navigate("/create/step-6");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">5. AI Destekli Tanıtım Metni</h2>
      <p className="mb-3 text-gray-700">
        Aşağıdaki metin sizin için AI tarafından oluşturuldu. Dilerseniz düzenleyebilirsiniz:
      </p>

      {loading ? (
        <p>Tanıtım metni oluşturuluyor...</p>
      ) : (
        <textarea
          value={introText}
          onChange={handleChange}
          rows={6}
          className="w-full p-3 border rounded"
          placeholder="Tanıtım metni burada görünecek..."
        />
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-6 text-right">
        <button 
          onClick={handleNext}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Kaydet ve Devam Et
        </button>
      </div>

      <div className="mt-20">
        <StepNavigation />
      </div>
    </div>
  );
}
