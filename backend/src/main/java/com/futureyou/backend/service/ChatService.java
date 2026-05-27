package com.futureyou.backend.service;

import org.springframework.stereotype.Service;

import com.futureyou.backend.dto.ChatRequest;
import com.futureyou.backend.dto.ChatResponse;
import com.futureyou.backend.prompt.SystemPrompt;

@Service

public class ChatService{

    private final GeminiService gemini;

    public ChatService(GeminiService gemini){
        this.gemini = gemini;
    }

    public ChatResponse reply(ChatRequest request){
        String fullPrompt =

        SystemPrompt.SYSTEM
        +

        "\nUser: "

        +

        request.getMessage();

        String result =
        gemini.generate(
        fullPrompt
        );

        return new ChatResponse(
        result
        );

    }
}