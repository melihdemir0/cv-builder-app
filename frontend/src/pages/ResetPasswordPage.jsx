import React, { useState } from 'react';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [info, setInfo] = useState('');

  const sendCode = async () => {
    const res = await fetch('http://localhost:8080/api/auth/send-reset-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const msg = await res.text();
    setInfo(msg);
  };

  const resetPassword = async () => {
    const res = await fetch('http://localhost:8080/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, newPassword })
    });

    const msg = await res.text();
    setInfo(msg);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md space-y-4">
        <h2 className="text-xl font-bold text-center">Şifremi Unuttum</h2>

        <input
          type="email"
          placeholder="E-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button
          onClick={sendCode}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Kodu Gönder
        </button>

        <input
          type="text"
          placeholder="Doğrulama Kodu"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="password"
          placeholder="Yeni Şifre"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          onClick={resetPassword}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Şifreyi Sıfırla
        </button>

        {info && <p className="text-center text-sm text-gray-700 mt-4">{info}</p>}
      </div>
    </div>
  );
}
