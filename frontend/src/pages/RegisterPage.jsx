import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Kayıt başarılı! Giriş yapabilirsiniz.');
      navigate('/login');
    } else {
      alert('Kayıt başarısız. Kullanıcı adı veya e-posta zaten kayıtlı olabilir.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Kayıt Ol</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Kullanıcı Adı"
            value={formData.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="E-posta"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Şifre"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            <button onClick={() => navigate('/login')} className="text-sm text-blue-600 underline"></button>
            Kayıt Ol
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-sm">Zaten hesabınız var mı? </span>
          <button onClick={() => navigate('/login')} className="text-sm text-blue-600 underline">
            Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
}
