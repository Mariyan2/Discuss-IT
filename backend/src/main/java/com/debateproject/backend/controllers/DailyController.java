package com.debateproject.backend.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/daily")
public class DailyController {

    @Value("${daily.api.key}")  // Reads from application.properties
    private String apiKey;

    @PostMapping("/create-room")
    public ResponseEntity<String> createRoom() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create request body as a Map instead of JSONObject
        Map<String, Object> body = new HashMap<>();
        Map<String, Boolean> properties = new HashMap<>();
        properties.put("enable_chat", true);
        properties.put("enable_screenshare", true);
        body.put("properties", properties);

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonBody = objectMapper.writeValueAsString(body);

            HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);
            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<String> response = restTemplate.postForEntity(
                    "https://api.daily.co/v1/rooms",
                    request,
                    String.class
            );

            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating Daily.co room: " + e.getMessage());
        }
    }
}
