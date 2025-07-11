import React, { useState } from 'react';
import { useCvForm } from '../context/CvFormContext';
import { useNavigate } from 'react-router-dom';

export default function LanguageForm() {
  const { formData, setFormData } = useCvForm();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); 

  // Eğer daha önce dil eklenmediyse, en az bir kutu göster
  const languages = formData.languages && formData.languages.length > 0
    ? formData.languages
    : [{ languageName: '', reading: '', writing: '', speaking: '' }];

  const languageOptions = ['İngilizce', 'Almanca', 'Fransızca', 'İspanyolca', 'Türkçe'];
  const levelOptions = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const handleChange = (index, field, value) => {
    const updated = [...languages];
    updated[index][field] = value;
    setFormData({ ...formData, languages: updated });
  };

  const handleAddLanguage = () => {
    setFormData({
      ...formData,
      languages: [
        ...languages,
        { languageName: '', reading: '', writing: '', speaking: '' },
      ]
    });
  };

  const handleRemoveLanguage = (index) => {
    const updated = languages.filter((_, i) => i !== index);
    setFormData({ ...formData, languages: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/cv/languages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(languages),
      });
      if (res.ok) {
        setSuccess(true);
        navigate("/create/step-5"); 
      }
    } catch (err) {
      console.error('Hata:', err);
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow bg-white">
        <h2 className="text-2xl font-bold mb-6">Dil Bilgileri</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {languages.map((lang, index) => (
            <div key={index} className="border p-4 rounded relative bg-gray-50">
              {index > 0 && (
                <button
                  type="button"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveLanguage(index)}
                >
                  Sil ✖
                </button>
              )}
              <label className="block font-medium mb-1">Dil</label>
              <select
                value={lang.languageName}
                onChange={(e) =>
                  handleChange(index, 'languageName', e.target.value)
                }
                className="w-full p-2 border rounded mb-4"
              >
                <option value="">Seçiniz</option>
                {languageOptions.map((langOption, i) => (
                  <option key={i} value={langOption}>
                    {langOption}
                  </option>
                ))}
              </select>

              <label className="block font-medium mb-1">Seviye Tercihleri</label>
              <div className="grid grid-cols-3 gap-4">
                <select
                  value={lang.reading}
                  onChange={(e) =>
                    handleChange(index, 'reading', e.target.value)
                  }
                  className="p-2 border rounded"
                >
                  <option value="">Okuma</option>
                  {levelOptions.map((level, i) => (
                    <option key={i} value={level}>{level}</option>
                  ))}
                </select>

                <select
                  value={lang.writing}
                  onChange={(e) =>
                    handleChange(index, 'writing', e.target.value)
                  }
                  className="p-2 border rounded"
                >
                  <option value="">Yazma</option>
                  {levelOptions.map((level, i) => (
                    <option key={i} value={level}>{level}</option>
                  ))}
                </select>

                <select
                  value={lang.speaking}
                  onChange={(e) =>
                    handleChange(index, 'speaking', e.target.value)
                  }
                  className="p-2 border rounded"
                >
                  <option value="">Konuşma</option>
                  {levelOptions.map((level, i) => (
                    <option key={i} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleAddLanguage}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              + Yeni Dil Ekle
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Kaydet ve Devam Et
            </button>
          </div>
          {success && <p className="text-green-600 mt-2">Dil bilgisi kaydedildi!</p>}
        </form>
      </div>
    </>
  );
}