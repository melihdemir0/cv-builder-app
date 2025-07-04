import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepNavigation from '../components/StepNavigation';
import { useCvForm } from '../context/CvFormContext';

export default function CvStep1() {
  const navigate = useNavigate();
  const { formData, setFormData } = useCvForm();
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0]
    });
  };

  const handleSubmit = async () => {
    const { fullName, jobTitle, address, phone, email, birthDate, photo } = formData;

    if (!fullName || !jobTitle|| !address || !phone || !email || !birthDate) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    const data = new FormData();
    data.append("fullName", fullName);
    data.append("jobTitle", jobTitle); 
    data.append("address", address);
    data.append("phone", phone);
    data.append("email", email);
    data.append("birthDate", birthDate);
    data.append("photo", photo);

    try {
      const res = await fetch("http://localhost:8080/api/users/personal-info", {
        method: "POST",
        body: data
      });
      if (res.ok) {
        setSuccess(true);
        navigate("/create/step-2"); 
      } else {
        console.error("❌ Sunucu hatası:", res.status);
      }
    } catch (err) {
      console.error("❌ İstek hatası:", err);
    }
  };

  return (
    <div>
      <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
        <h2 className="text-2xl font-bold mb-4">1. Kişisel Bilgiler</h2>

        <div className="space-y-3">
          <input type="text" name="fullName" placeholder="Ad Soyad" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="jobTitle" placeholder="İş Unvanı" value={formData.jobTitle || ""} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="address" placeholder="Adres" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="tel" name="phone" placeholder="Telefon (5xx1234567)" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full p-2 border rounded" />

          <div className="flex items-center gap-4">
            <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300">
              Dosya Seç
              <input type="file" name="photo" onChange={handleFileChange} className="hidden" />
            </label>
            <span className="text-sm text-gray-600">Profil resmi seçin</span>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded">
            Kaydet ve Devam Et
          </button>
        </div>

        {success && <p className="text-green-600 mt-4">✅ Bilgiler başarıyla kaydedildi!</p>}
      </div>

      <div className="mt-20">
        <StepNavigation />
      </div>
    </div>
  );
}
