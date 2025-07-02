import React, { useState } from 'react';

export default function LanguageForm() {
  const [formData, setFormData] = useState({
    languageName: '',
    readingLevel: '',
    writingLevel: '',
    speakingLevel: ''
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
      const res = await fetch('http://localhost:8080/api/cv/language', {
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
      <h2 className="text-2xl font-bold mb-4">Dil Bilgisi</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2"
          type="text"
          name="languageName"
          placeholder="Dil (örn. İngilizce)"
          value={formData.languageName}
          onChange={handleChange}
        />
        <input
          className="w-full border px-3 py-2"
          type="text"
          name="readingLevel"
          placeholder="Okuma Seviyesi (örn. B2)"
          value={formData.readingLevel}
          onChange={handleChange}
        />
        <input
          className="w-full border px-3 py-2"
          type="text"
          name="writingLevel"
          placeholder="Yazma Seviyesi"
          value={formData.writingLevel}
          onChange={handleChange}
        />
        <input
          className="w-full border px-3 py-2"
          type="text"
          name="speakingLevel"
          placeholder="Konuşma Seviyesi"
          value={formData.speakingLevel}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Kaydet
        </button>
        {success && <p className="text-green-600 mt-2">Dil bilgisi kaydedildi!</p>}
      </form>
    </div>
  );
}
