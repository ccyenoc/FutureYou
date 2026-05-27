package com.futureyou.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futureyou.backend.dto.ChatRequest;
import com.futureyou.backend.dto.ChatResponse;
import com.futureyou.backend.service.ChatService;

@RestController
@RequestMapping("/chat")
public class ChatController{

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ChatResponse ask( @RequestBody ChatRequest request){
        return chatService.reply(request);
    }

}