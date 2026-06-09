package com.futureyou.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futureyou.backend.dto.ChatRequest;
import com.futureyou.backend.dto.ChatResponse;
import com.futureyou.backend.service.ChatService;
import com.futureyou.backend.service.JobService;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    private JobService jobService;

    @PostMapping
    public ChatResponse ask(@RequestBody ChatRequest request) {
        return chatService.reply(request);
    }

    public ChatService getChatService() {
        return chatService;
    }

    public void setChatService(ChatService chatService) {
        this.chatService = chatService;
    }

    public void setJobService(JobService jobService) {
        this.jobService = jobService;
    }

    public JobService getJobService() {
        return jobService;
    }
}