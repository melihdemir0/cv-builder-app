const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function generateIntro({ fullName, jobTitle, school, experience }) {
  const prompt = `
Aşağıdaki bilgilerle bir özgeçmiş tanıtım metni oluştur:

- Adı: ${fullName}
- Meslek: ${jobTitle}
- Okul: ${school}
- Deneyim: ${experience}

Metin kısa, etkileyici ve profesyonel olmalı. "Ben" dilini kullan.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 200
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API hatası: ${errText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
