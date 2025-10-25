package com.debateproject.backend.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/daily")
public class DailyController {

    @Value("${daily.api.key}")  // Reads from application.properties
    private String apiKey;

    //  In memory cache to store room URLs
    private final Map<String, String> roomCache = new ConcurrentHashMap<>();
    //creates or gets current room for the discussion
    @GetMapping("/get-room/{discussionId}")
    public ResponseEntity<String> getRoom(@PathVariable String discussionId) {
        try {
            // Checks if room already exists
            if (roomCache.containsKey(discussionId)) {
                return ResponseEntity.ok(roomCache.get(discussionId));
            }

            // Creates header for the daily API
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Builds room creation body
            Map<String, Object> body = new HashMap<>();
            Map<String, Object> properties = new HashMap<>();
            properties.put("enable_chat", true);
            properties.put("enable_screenshare", true);
            properties.put("exp", (System.currentTimeMillis() / 1000L) + 3600); // 1 hour expiry
            body.put("properties", properties);

            ObjectMapper objectMapper = new ObjectMapper();
            String jsonBody = objectMapper.writeValueAsString(body);

            // request is sent to daily api
            RestTemplate restTemplate = new RestTemplate();
            HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    "https://api.daily.co/v1/rooms",
                    request,
                    Map.class
            );

            // extracts url field
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                String roomUrl = (String) response.getBody().get("url");
                roomCache.put(discussionId, roomUrl); // Save to in-memory cache
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
