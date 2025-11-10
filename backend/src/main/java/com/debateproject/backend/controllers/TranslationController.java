package com.debateproject.backend.controllers;

import com.debateproject.backend.services.TranslationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/translate")
public class TranslationController {

    private final TranslationService translationService;

    public TranslationController(TranslationService translationService) {
        this.translationService = translationService;
    }

    @GetMapping("/en-bg")
    public String translateEnglishToBulgarian(@RequestParam String text) {
        return translationService.translateEnToBg(text);
    }
}
