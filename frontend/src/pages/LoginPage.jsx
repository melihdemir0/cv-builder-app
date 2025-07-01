import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/create/step-1');
    } else {
      alert('Giriş başarısız. Kullanıcı adı veya şifre hatalı.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Giriş Yap</h2>
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Giriş Yap
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-sm">Hesabınız yok mu? </span>
          <button onClick={() => navigate('/register')} className="text-sm text-blue-600 underline">
            Kayıt Ol
          </button>
        </div>
        <div className="text-center mt-4">
        <button onClick={() => navigate('/reset-password')} className="text-sm text-red-600 underline">
            Şifremi Unuttum
        </button>
        </div>
      </div>
    </div>
  );
}
