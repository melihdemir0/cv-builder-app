import React from 'react';
import PersonalInfoForm from './components/PersonalInfoForm';
import EducationForm from './components/EducationForm'; // education formu ekledik

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">CV Oluşturma Uygulaması</h1>

      {/* Kişisel Bilgiler */}
      <section className="mb-12">
        <PersonalInfoForm />
      </section>

      {/* Eğitim Bilgileri */}
      <section>
        <EducationForm />
      </section>
    </div>
  );
}

export default App;
