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

    // Delegates to service
    @GetMapping("/get-room/{discussionId}")
    public ResponseEntity<String> getRoom(@PathVariable String discussionId) {
        return dailyService.getRoom(discussionId);
    }
}

