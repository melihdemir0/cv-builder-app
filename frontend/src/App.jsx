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
import CvStep5 from './pages/CvStep5';
import CvStep6 from './pages/CvStep6';
import { CvFormProvider } from './context/CvFormContext';

function App() {
  return (
    <CvFormProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/create/step-1" element={<CvStep1 />} />
        <Route path="/create/step-2" element={<CvStep2 />} />
        <Route path="/create/step-3" element={<CvStep3 />} />
        <Route path="/create/step-4" element={<CvStep4 />} />
        <Route path="/create/step-5" element={<CvStep5 />} />
        <Route path="/create/step-6" element={<CvStep6 />} />
        <Route path="/create" element={<Navigate to="/create/step-1" />} />
      </Routes>
    </BrowserRouter>
    </CvFormProvider>
  );
}

export default App;
