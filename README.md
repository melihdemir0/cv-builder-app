# CV Builder App

Bu proje, kullanıcıların adım adım CV (özgeçmiş) oluşturmalarını sağlayan bir web uygulamasıdır. Spring Boot (Backend) ve React (Frontend) teknolojileri kullanılarak geliştirilmiştir.

## ✨ Özellikler

- Kişisel bilgilerin (isim, adres, e-posta, telefon vb.) girilmesi
- Eğitim ve iş deneyimlerinin eklenmesi
- Yabancı dil bilgisi girme
- AI (Yapay Zeka) destekli tanıtım metni oluşturma (Groq API kullanılarak)
- Çok adımlı form yapısı ile düzenli kullanıcı deneyimi
- Gerçek zamanlı CV önizlemesi (PDF formatında çıktı desteği)
- Modern, sade ve kullanıcı dostu arayüz

## 🚀 Kullanılan Teknolojiler

### Backend
- Java 21
- Spring Boot
- RESTful API
- Lombok
- PostgreSQL
- OpenAI LLM API (Groq)

### Frontend
- React (v18)
- Vite (v4)
- Tailwind CSS (v3)
- React Router DOM (v7)

## 📁 Proje Yapısı

cv-builder-app/

├── backend/

│ └── src/main/java/com/cvbuilder/backend/

├── frontend/

│ └── src/pages/

└── README.md


## ⚙️ Kurulum Adımları

### Backend

1. `backend/` klasörüne girin:
cd backend
2.application.properties ya da .env dosyasına aşağıdaki satırı ekleyin:
groq.api.key=your-api-key
3.Uygulamayı çalıştırın.

### Frontend
1.frontend/ klasörüne girin:

cd frontend
2.Gerekli paketleri yükleyin:

npm install

3.Uygulamayı başlatın:

npm run dev

### Giriş Adresleri
Frontend: http://localhost:5173

Backend API: http://localhost:8080

## 👥 Katkı  
Bu proje aşağıdaki geliştiricilerin işbirliğiyle hazırlanmıştır:

- [Melih Demir](https://github.com/melihdemir0)  
- [İrem Dehri](https://github.com/iremdehri)

