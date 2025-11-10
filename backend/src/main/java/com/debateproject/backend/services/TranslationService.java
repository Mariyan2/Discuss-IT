package com.debateproject.backend.services;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class TranslationService {

    private static final String TRANSLATE_URL = "http://localhost:5000/translate";

    public String translateEnToBg(String text) {
        try {
            if (text == null || text.isBlank()) return "";

            RestTemplate restTemplate = new RestTemplate();

            // Request body
            Map<String, String> body = new HashMap<>();
            body.put("q", text);
            body.put("source", "en");
            body.put("target", "bg");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(TRANSLATE_URL, request, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Object translated = response.getBody().get("translatedText");
                return translated != null ? translated.toString() : "Translation failed";
            }

            return "Translation failed";

        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
}

