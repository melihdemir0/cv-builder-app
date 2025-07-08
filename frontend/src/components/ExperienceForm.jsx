import React, { useState } from 'react';
import { useCvForm } from '../context/CvFormContext';
import { useNavigate } from 'react-router-dom';

export default function ExperienceForm() {
  const { formData, setFormData } = useCvForm();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); 

  // Eğer daha önce deneyim eklenmediyse, en az bir kutu göster
  const experiences = formData.experiences && formData.experiences.length > 0
    ? formData.experiences
    : [{ companyName: '', position: '', startDate: '', endDate: '', description: '' }];

  const handleChange = (index, e) => {
    const updated = experiences.map((exp, i) =>
      i === index ? { ...exp, [e.target.name]: e.target.value } : exp
    );
    setFormData({ ...formData, experiences: updated });
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...experiences,
        { companyName: '', position: '', startDate: '', endDate: '', description: '' }
      ]
    });
  };

  const handleRemoveExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/cv/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(experiences)
      });
      if (res.ok) {
        setSuccess(true);
        navigate("/create/step-4"); 
      }
    } catch (err) {
      console.error('Hata:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Deneyim Bilgileri</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={index} className="border p-4 rounded relative bg-gray-50 mb-4">
            {index > 0 && (
              <button
                type="button"
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveExperience(index)}
              >
                Sil ✖
              </button>
            )}
            <input
              className="w-full border px-3 py-2 mb-2"
              type="text"
              name="companyName"
              placeholder="Şirket Adı"
              value={exp.companyName}
              onChange={e => handleChange(index, e)}
            />
            <input
              className="w-full border px-3 py-2 mb-2"
              type="text"
              name="position"
              placeholder="Pozisyon"
              value={exp.position}
              onChange={e => handleChange(index, e)}
            />
            <input
              className="w-full border px-3 py-2 mb-2"
              type="text"
              name="startDate"
              placeholder="Başlangıç Tarihi"
              value={exp.startDate}
              onChange={e => handleChange(index, e)}
            />
            <input
              className="w-full border px-3 py-2 mb-2"
              type="text"
              name="endDate"
              placeholder="Bitiş Tarihi"
              value={exp.endDate}
              onChange={e => handleChange(index, e)}
            />
            <textarea
              className="w-full border px-3 py-2 mb-2"
              name="description"
              placeholder="Açıklama / Görevler"
              value={exp.description}
              onChange={e => handleChange(index, e)}
            ></textarea>
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddExperience}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Deneyim Ekle
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Kaydet ve Devam Et
          </button>
        </div>
        {success && <p className="text-green-600 mt-2">Deneyim kaydedildi!</p>}
      </form>
    </div>
  );
}