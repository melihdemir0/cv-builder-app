import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

export default function CvPreview({ personalInfo, educationList, experienceList, languageList, aiIntro }) {
  const pdfRef = useRef();

  const handleDownload = () => {
    const element = pdfRef.current;
    const options = {
      margin: 0.5,
      filename: "cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3 }, // ✅ kalite artırıldı
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">CV Önizleme</h2>

      {/* 🔒 SADECE PDF'E GİRECEK ALAN */}
      <div ref={pdfRef} className="bg-white p-6 border rounded shadow space-y-6">

        {/* Kişisel Bilgiler */}
        <div className="flex gap-6">
          {personalInfo.photo && (
            <img
              src={URL.createObjectURL(personalInfo.photo)}
              alt="Profil Fotoğrafı"
              className="w-28 h-28 object-cover rounded border"
            />
          )}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{personalInfo.fullName}</h1>
            <p>{personalInfo.email}</p>
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.address}</p>
            <p>{personalInfo.birthDate}</p>
          </div>
        </div>

        {/* Tanıtım */}
        {aiIntro && (
          <div>
            <h3 className="text-lg font-semibold mb-1">Tanıtım</h3>
            <p className="italic">{aiIntro}</p>
          </div>
        )}

        {/* Eğitim */}
        {educationList && educationList.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-1">Eğitim</h3>
            <ul className="list-disc list-inside space-y-1">
              {educationList.map((edu, index) => (
                <li key={index}>
                  <strong>{edu.schoolName}</strong> - {edu.degree} / {edu.field}
                  ({edu.startDate} - {edu.endDate})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Deneyim */}
        {experienceList && experienceList.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-1">Deneyim</h3>
            <ul className="list-disc list-inside space-y-1">
              {experienceList.map((exp, index) => (
                <li key={index}>
                  <strong>{exp.companyName}</strong> - {exp.position}
                  ({exp.startDate} - {exp.endDate})<br />
                  <span className="text-sm text-gray-700">{exp.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Yabancı Diller */}
        {languageList && languageList.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-1">Yabancı Diller</h3>
            <ul className="list-disc list-inside space-y-1">
              {languageList.map((lang, index) => (
                <li key={index}>
                  <strong>{lang.languageName}</strong> — 
                  Okuma: {lang.reading}, Yazma: {lang.writing}, Konuşma: {lang.speaking}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ✅ PDF DIŞI: İndirme Butonu */}
      <div className="mt-6 text-right">
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          PDF Olarak İndir
        </button>
      </div>
    </div>
  );
}
