import React, { useState } from 'react';
import StepNavigation from "../components/StepNavigation";

export default function CvStep1() {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    birthDate: '',
    aiIntro: ''
  });

  const [photo, setPhoto] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("address", formData.address);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("birthDate", formData.birthDate);
    data.append("aiIntro", formData.aiIntro);
    if (photo) {
      data.append("photo", photo);
    }

    try {
      const res = await fetch("http://localhost:8080/api/users/personal-info", {
        method: "POST",
        body: data
      });
      if (res.ok) {
        console.log("✅ Bilgiler başarıyla gönderildi");
        setSuccess(true);
      } else {
        console.error("❌ Sunucu hatası:", res.status);
      }
    } catch (err) {
      console.error("❌ İstek hatası:", err);
    }
  };

  return (
    <div>
      <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">1. Kişisel Bilgiler</h2>

        <div className="space-y-3">
          <input type="text" name="fullName" placeholder="Ad Soyad" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="address" placeholder="Adres" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="tel" name="phone" placeholder="Telefon" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="file" name="photo" onChange={handleFileChange} className="w-full p-2 border rounded" />
        </div>

        <div className="mt-6 text-right">
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded">
            Kaydet
          </button>
        </div>

        {success && <p className="text-green-600 mt-4">✅ Bilgiler başarıyla kaydedildi!</p>}

        <StepNavigation />
      </div>
    </div>
  );
}
