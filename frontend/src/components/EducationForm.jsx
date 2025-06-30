import React, { useState } from 'react';

export default function EducationForm() {
  const [formData, setFormData] = useState({
    schoolName: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: ''
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/cv/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch (err) {
      console.error('Hata:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Eğitim Bilgileri</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2"
          type="text"
          name="schoolName"
          placeholder="Okul Adı"
          value={formData.schoolName}
          onChange={handleChange}
        />
        <input
          className="w-full border px-3 py-2"
          type="text"
          name="degree"
          placeholder="Derece (Lisans, Yüksek Lisans...)"
          value={formData.degree}
          onChange={handleChange}
        />
        <input
          className="w-full border px-3 py-2"
          type="text"
          name="field"
          placeholder="Bölüm/Alan"
          value={formData.field}
          onChange={handleChange}
        />
        <input
          className="w-full border px-3 py-2"
          type="text"
          name="startDate"
          placeholder="Başlangıç Tarihi"
          value={formData.startDate}
          onChange={handleChange}
        />
        <input
          className="w-full border px-3 py-2"
          type="text"
          name="endDate"
          placeholder="Bitiş Tarihi"
          value={formData.endDate}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Kaydet
        </button>
        {success && <p className="text-green-600 mt-2">Eğitim bilgisi kaydedildi!</p>}
      </form>
    </div>
  );
}
