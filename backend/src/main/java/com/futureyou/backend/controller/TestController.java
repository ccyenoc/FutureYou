package com.futureyou.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futureyou.backend.service.GeminiService;

@RestController
public class TestController {

    private final GeminiService geminiService;

    public TestController(
        GeminiService geminiService
    ){
        this.geminiService = geminiService;
    }

    @GetMapping("/test-gemini")
    public String test() {

        return geminiService.generate(
            "Reply with exactly: hello"
        );
    }
}


