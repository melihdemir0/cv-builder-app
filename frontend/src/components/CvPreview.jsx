import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

export default function CvPreview({ personalInfo, educationList, experienceList, languageList, aiIntro }) {
  const pdfRef = useRef();

  const handleDownload = () => {
    const element = pdfRef.current;
    const options = {
      margin: 0,
      filename: "cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">CV Önizleme</h2>

      <div ref={pdfRef} className="flex border rounded shadow overflow-hidden bg-white text-sm">
        {/* Sol Panel */}
        <div className="w-1/3 bg-gray-100 p-4 space-y-6">
          {/* Fotoğraf */}
          {personalInfo.photo && (
            <img
              src={URL.createObjectURL(personalInfo.photo)}
              alt="Profil"
              className="w-full h-auto rounded"
            />
          )}

          {/* İletişim */}
          <div>
            <h3 className="font-semibold border-b mb-2">İLETİŞİM</h3>
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.email}</p>
            <p>{personalInfo.address}</p>
          </div>

          {/* Hakkımda */}
          {aiIntro && (
            <div>
              <h3 className="font-semibold border-b mb-2">HAKKIMDA</h3>
              <p className="text-justify italic">{aiIntro}</p>
            </div>
          )}

          {/* Beceriler 
          <div>
            <h3 className="font-semibold border-b mb-2">BECERİLER</h3>
            <ul className="list-disc list-inside">
              <li>Zaman Yönetimi</li>
              <li>Takım Çalışması</li>
              <li>Analitik Düşünme</li>
              <li>İnovatif Yaklaşım</li>
            </ul>
          </div> */}

          {/* Diller */}
          {languageList && languageList.length > 0 && (
            <div>
              <h3 className="font-semibold border-b mb-2">DİLLER</h3>
              <ul className="list-disc list-inside">
                {languageList.map((lang, index) => (
                  <li key={index}>{lang.languageName} — Okuma: {lang.reading}, Yazma: {lang.writing}, Konuşma: {lang.speaking}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sağ Panel */}
        <div className="w-2/3 p-6 space-y-6">
          {/* Ad Soyad ve Meslek */}
          <div>
            <h1 className="text-3xl font-bold uppercase">{personalInfo.fullName}</h1>
            <p className="text-lg font-semibold text-gray-700">{personalInfo.jobTitle}</p>
          </div>

          {/* Deneyimler */}
          {experienceList && experienceList.length > 0 && (
            <div>
              <h3 className="font-semibold border-b mb-2">İŞ DENEYİMİ</h3>
              {experienceList.map((exp, index) => (
                <div key={index} className="mb-2">
                  <p className="font-medium">{exp.companyName} - {exp.position}</p>
                  <p className="text-gray-600 text-sm">{exp.startDate} - {exp.endDate}</p>
                  <p className="text-justify">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Eğitim */}
          {educationList && educationList.length > 0 && (
            <div>
              <h3 className="font-semibold border-b mb-2">EĞİTİM</h3>
              {educationList.map((edu, index) => (
                <div key={index} className="mb-2">
                  <p className="font-medium">{edu.schoolName} - {edu.degree}</p>
                  <p className="text-gray-600 text-sm">{edu.field} ({edu.startDate} - {edu.endDate})</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
