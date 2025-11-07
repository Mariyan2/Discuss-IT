package com.debateproject.backend.services;

import java.util.List;
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

    // Stores generated Daily room URLs in memory for faster reuse
    private final Map<String, String> roomCache = new ConcurrentHashMap<>();

    public ResponseEntity<String> getRoom(String discussionId) {
        try {
            // Check if a room for this discussion already exists in cache
            if (roomCache.containsKey(discussionId)) {
                return ResponseEntity.ok(roomCache.get(discussionId));
            }

            // Prepare authorization headers for Daily API requests
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            RestTemplate restTemplate = new RestTemplate();

            // First, check if a room with this name already exists on Daily
            String getUrl = "https://api.daily.co/v1/rooms/" + discussionId;
            try {
                ResponseEntity<Map> existingRoom = restTemplate.exchange(
                        getUrl, HttpMethod.GET, new HttpEntity<>(headers), Map.class);

                if (existingRoom.getStatusCode().is2xxSuccessful() && existingRoom.getBody() != null) {
                    String existingUrl = (String) existingRoom.getBody().get("url");
                    roomCache.put(discussionId, existingUrl);
                    return ResponseEntity.ok(existingUrl);
                }
            } catch (Exception ignored) {
                // If no existing room found, create a new one below
            }

            // Create a new Daily room if one doesn’t already exist
            Map<String, Object> body = new HashMap<>();
            body.put("name", discussionId);
            body.put("privacy", "public");

            Map<String, Object> properties = new HashMap<>();
            properties.put("enable_chat", true);
            properties.put("enable_screenshare", true);
            properties.put("enable_transcription", true);
            properties.put("exp", (System.currentTimeMillis() / 1000L) + 3600); // Room expires in 1 hour
            body.put("properties", properties);

            ObjectMapper objectMapper = new ObjectMapper();
            String jsonBody = objectMapper.writeValueAsString(body);

            HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);
            ResponseEntity<Map> createResponse =
                    restTemplate.postForEntity("https://api.daily.co/v1/rooms", request, Map.class);

            // Store and return the newly created room URL
            if (createResponse.getStatusCode().is2xxSuccessful() && createResponse.getBody() != null) {
                String newUrl = (String) createResponse.getBody().get("url");
                roomCache.put(discussionId, newUrl);
                return ResponseEntity.ok(newUrl);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Failed to create Daily room: " + createResponse.getStatusCode());
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating or fetching Daily room: " + e.getMessage());
        }
    }

    public ResponseEntity<String> getMeetingToken(String roomName, String userName) {
        try {
            // Configure headers for the token request
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Assign the user as owner to allow transcription and admin permissions
            Map<String, Object> properties = Map.of(
                    "room_name", roomName,
                    "is_owner", true,
                    "user_name", userName
            );

            Map<String, Object> body = Map.of("properties", properties);

            ObjectMapper objectMapper = new ObjectMapper();
            String jsonBody = objectMapper.writeValueAsString(body);

            RestTemplate restTemplate = new RestTemplate();
            HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

            String apiUrl = "https://api.daily.co/v1/meeting-tokens";
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, request, Map.class);

            // Return the token if successful
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                String token = (String) response.getBody().get("token");
                return ResponseEntity.ok(token);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Failed to create meeting token: " + response.getStatusCode());
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating meeting token: " + e.getMessage());
        }
    }

}
