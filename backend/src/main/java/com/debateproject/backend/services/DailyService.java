package com.debateproject.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class DailyService {

    @Value("${daily.api.key}")
    private String apiKey;

    // In-memory cache to store room URLs
    private final Map<String, String> roomCache = new ConcurrentHashMap<>();

    public ResponseEntity<String> getRoom(String discussionId) {
        try {
            // Return from cache if it already exists
            if (roomCache.containsKey(discussionId)) {
                return ResponseEntity.ok(roomCache.get(discussionId));
            }

            // Prepare headers for Daily API
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Build request body
            Map<String, Object> body = new HashMap<>();
            Map<String, Object> properties = new HashMap<>();
            properties.put("enable_chat", true);
            properties.put("enable_screenshare", true);
            properties.put("exp", (System.currentTimeMillis() / 1000L) + 3600); // 1-hour expiry
            body.put("properties", properties);

            // Convert to JSON
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonBody = objectMapper.writeValueAsString(body);

            // Send request
            RestTemplate restTemplate = new RestTemplate();
            HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    "https://api.daily.co/v1/rooms",
                    request,
                    Map.class
            );

            // Parse and store response
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                String roomUrl = (String) response.getBody().get("url");
                roomCache.put(discussionId, roomUrl);
                return ResponseEntity.ok(roomUrl);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Failed to create Daily room: " + response.getStatusCode());
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating or fetching Daily room: " + e.getMessage());
        }
    }
}
