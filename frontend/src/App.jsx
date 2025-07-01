import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CvStep1 from './pages/CvStep1';
import CvStep2 from './pages/CvStep2';
import CvStep3 from './pages/CvStep3';
import CvStep4 from './pages/CvStep4';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/create/step-1" element={<CvStep1 />} />
        //<Route path="/create/step-2" element={<CvStep2 />} />
        //<Route path="/create/step-3" element={<CvStep3 />} />
        //<Route path="/create/step-4" element={<CvStep4 />} />
        <Route path="/create" element={<Navigate to="/create/step-1" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
