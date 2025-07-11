package com.cvbuilder.backend.service;

import com.cvbuilder.backend.dto.AiIntroRequestDto;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    @Value("${groq.api.key}")
    private String groqApiKey;

    private static final String GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

    public String generateIntro(AiIntroRequestDto dto) {
        OkHttpClient client = new OkHttpClient();

        String prompt = String.format(
                "Kendini tanıtan kısa bir metin oluştur: %s adlı kişi, %s mezunu ve %s olarak çalışmıştır. Mesleği: %s.",
                dto.getFullName(), dto.getSchool(), dto.getExperience(), dto.getProfession()
        );

        System.out.println("=== AI INTRO İSTEĞİ ===");
        System.out.println("Ad: " + dto.getFullName());
        System.out.println("Okul: " + dto.getSchool());
        System.out.println("Deneyim: " + dto.getExperience());
        System.out.println("Meslek: " + dto.getProfession());
        System.out.println("Gönderilen Prompt:\n" + prompt);

        String json = "{\n" +
                "  \"model\": \"meta-llama/llama-4-scout-17b-16e-instruct\",\n" +
                "  \"messages\": [\n" +
                "    {\"role\": \"user\", \"content\": \"" + prompt + "\"}\n" +
                "  ]\n" +
                "}";

        RequestBody body = RequestBody.create(json, MediaType.get("application/json"));
        Request request = new Request.Builder()
                .url(GROQ_API_URL)
                .header("Authorization", "Bearer " + groqApiKey)
                .header("Content-Type", "application/json")
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            String responseBody = response.body() != null ? response.body().string() : "null";
            System.out.println("OpenAI cevabı:\n" + responseBody);

            if (response.isSuccessful() && responseBody != null) {
                int contentIndex = responseBody.indexOf("\"content\":\"") + 11;
                int endIndex = responseBody.indexOf("\"", contentIndex);
                return responseBody.substring(contentIndex, endIndex)
                        .replace("\\n", " ")
                        .replace("\\", "");
            } else {
                return "AI cevabı alınamadı: " + response.code();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "AI istek hatası: " + e.getMessage();
        }
    }
}
