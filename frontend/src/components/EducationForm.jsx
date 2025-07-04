import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCvForm } from '../context/CvFormContext';

export default function EducationForm() {
  const navigate = useNavigate();
  const { formData, setFormData } = useCvForm();

  const [success, setSuccess] = useState(false);

  const educations = formData.educations && formData.educations.length > 0
    ? formData.educations
    : [{ schoolName: '', degree: '', field: '', startDate: '', endDate: '' }];
  
  const handleChange = (index, e) => {
    const updated = educations.map((edu, i) =>
      i === index ? { ...edu, [e.target.name]: e.target.value } : edu
  );
  setFormData({ ...formData, educations: updated });
};


  const handleAddEducation = () => {
  setFormData({
    ...formData,
    educations: [
      ...educations,
      { schoolName: '', degree: '', field: '', startDate: '', endDate: '' }
    ]
  });
};

  const handleRemoveEducation = (index) => {
    const updated = educations.filter((_, i) => i !== index);
    setFormData({ ...formData, educations: updated });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/cv/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData.educations || [])
      });
      if (res.ok) {
        setSuccess(true);
        navigate('/create/step-3');
      }
    } catch (err) {
      console.error('Hata:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">2. Eğitim Bilgileri</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {educations.map((edu, index) => (
          <div key={index} className="border p-4 rounded relative bg-gray-50 mb-4">
            {index > 0 && (
              <button
                type="button"
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveEducation(index)}
              >
                Sil ✖
              </button>
            )}
            <input
              className="w-full border px-3 py-2 mb-2"
              type="text"
              name="schoolName"
              placeholder="Okul Adı"
              value={edu.schoolName}
              onChange={e => handleChange(index, e)}
              required
            />
            <input
              className="w-full border px-3 py-2 mb-2"
              type="text"
              name="degree"
              placeholder="Derece (Lisans, Yüksek Lisans...)"
              value={edu.degree}
              onChange={e => handleChange(index, e)}
              required
            />
            <input
              className="w-full border px-3 py-2 mb-2"
              type="text"
              name="field"
              placeholder="Bölüm/Alan"
              value={edu.field}
              onChange={e => handleChange(index, e)}
              required
            />
            <input
              className="w-full border px-3 py-2 mb-2"
              type="text"
              name="startDate"
              placeholder="Başlangıç Tarihi"
              value={edu.startDate}
              onChange={e => handleChange(index, e)}
              required
            />
            <input
              className="w-full border px-3 py-2 mb-2"
              type="text"
              name="endDate"
              placeholder="Bitiş Tarihi"
              value={edu.endDate}
              onChange={e => handleChange(index, e)}
              required
            />
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddEducation}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Eğitim Ekle
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Kaydet ve Devam Et
          </button>
        </div>
        {success && <p className="text-green-600 mt-2">Eğitim bilgisi kaydedildi!</p>}
      </form>
    </div>
  );
}
