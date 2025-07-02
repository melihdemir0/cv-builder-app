import React, { useState } from 'react';

export default function LanguageForm() {
  const [languages, setLanguages] = useState([
    { languageName: '', reading: '', writing: '', speaking: '' },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...languages];
    updated[index][field] = value;
    setLanguages(updated);
  };

  const handleAddLanguage = () => {
    setLanguages([
      ...languages,
      { languageName: '', reading: '', writing: '', speaking: '' },
    ]);
  };

  const handleRemoveLanguage = (index) => {
    const updated = languages.filter((_, i) => i !== index);
    setLanguages(updated);
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
        alert('Diller başarıyla kaydedildi');
      }
    } catch (err) {
      console.error('Hata:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Dil Bilgisi</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {languages.map((lang, index) => (
          <div
            key={index}
            className="border p-4 rounded relative bg-gray-50"
          >
            {index > 0 && (
              <button
                type="button"
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveLanguage(index)}
              >
                Sil ✖
              </button>
            )}
            <input
              type="text"
              placeholder="Dil Adı (örn: İngilizce)"
              value={lang.languageName}
              onChange={(e) =>
                handleChange(index, 'languageName', e.target.value)
              }
              className="w-full p-2 border rounded mb-2"
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Okuma (örn: B1)"
                value={lang.reading}
                onChange={(e) =>
                  handleChange(index, 'reading', e.target.value)
                }
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Yazma (örn: C2)"
                value={lang.writing}
                onChange={(e) =>
                  handleChange(index, 'writing', e.target.value)
                }
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Konuşma (örn: B2)"
                value={lang.speaking}
                onChange={(e) =>
                  handleChange(index, 'speaking', e.target.value)
                }
                className="p-2 border rounded"
              />
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
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
