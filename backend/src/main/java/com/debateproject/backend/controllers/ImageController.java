package com.debateproject.backend.controllers;

import com.debateproject.backend.services.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService imageService;

    // constructor injection
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    // Upload to service
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        return imageService.uploadImage(file);
    }
}
