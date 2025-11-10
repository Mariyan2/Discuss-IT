package com.debateproject.backend.controllers;

import com.debateproject.backend.services.DailyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/daily")
public class DailyController {

    private final DailyService dailyService;

    public DailyController(DailyService dailyService) {
        this.dailyService = dailyService;
    }
    //Creates or retrieves discussion room
    @GetMapping("/get-room/{discussionId}")
    public ResponseEntity<String> getRoom(@PathVariable String discussionId) {
        return dailyService.getRoom(discussionId);
    }
    //Generates temporary access token so a user can join daily room with admin permissions ( required for enabling captions)
    @GetMapping("/get-token/{roomName}")
    public ResponseEntity<String> getMeetingToken(
            @PathVariable String roomName,
            @RequestParam String user) {
        return dailyService.getMeetingToken(roomName, user);
    }

}

