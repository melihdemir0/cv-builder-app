import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token") !== null;

  const handleCvCreate = () => {
    if (isAuthenticated) {
      // Giriş yapmış kullanıcı: daha sonra düzenleyebilmek için
      navigate('/create/step-1');
    } else {
      // Giriş yapmamış kullanıcı: yine aynı şekilde başlasın
      navigate('/create/step-1');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Üst Menü */}
      <div className="flex justify-end p-6 gap-4">
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-gray-300 to-gray-500 text-black font-semibold shadow-md hover:opacity-90"
        >
          Giriş Yap
        </button>
        <button
          onClick={handleCvCreate}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold shadow-md hover:opacity-90"
        >
          CV Oluştur
        </button>
      </div>

      {/* Orta Alan */}
      <div className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h1 className="text-5xl font-extrabold text-blue-700">CV Oluştur</h1>
        <p className="mt-4 text-lg font-medium text-gray-800 max-w-xl">
          Bilgilerinizi doldurun, şablonu seçin ve CV’nizi hemen oluşturalım.
        </p>
        <button
          onClick={handleCvCreate}
          className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-blue-300 to-blue-600 text-white font-bold text-lg shadow-lg"
        >
          CV Oluştur
        </button>
      </div>

      {/* Şablon Örnekleri */}
      <div className="py-10 px-6 bg-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-6">Örnek Şablonlar</h2>
        <div className="flex justify-center gap-6 flex-wrap">
          <img src="/ornek1.jpg" alt="Şablon 1" className="w-52 h-auto rounded border shadow-sm" />
          <img src="/ornek2.jpg" alt="Şablon 2" className="w-52 h-auto rounded border shadow-sm" />
          <img src="/ornek3.png" alt="Şablon 3" className="w-52 h-auto rounded border shadow-sm" />
        </div>
      </div>
    </div>
  );
}
