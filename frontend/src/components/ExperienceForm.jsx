import React, { useState } from 'react';

export default function ExperienceForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
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
      const res = await fetch('http://localhost:8080/api/cv/experience', {
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
      <h2 className="text-2xl font-bold mb-4">Deneyim Bilgileri</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2"
          type="text"
          name="companyName"
          placeholder="Şirket Adı"
          value={formData.companyName}
          onChange={handleChange}
        />
        <input
          className="w-full border px-3 py-2"
          type="text"
          name="position"
          placeholder="Pozisyon"
          value={formData.position}
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
        <textarea
          className="w-full border px-3 py-2"
          name="description"
          placeholder="Açıklama / Görevler"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Kaydet
        </button>
        {success && <p className="text-green-600 mt-2">Deneyim kaydedildi!</p>}
      </form>
    </div>
  );
}
