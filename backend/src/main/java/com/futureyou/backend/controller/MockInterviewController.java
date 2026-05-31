package com.futureyou.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futureyou.backend.dto.InterviewEvaluationRequest;
import com.futureyou.backend.dto.InterviewEvaluationResponse;
import com.futureyou.backend.dto.InterviewResponseRequest;
import com.futureyou.backend.dto.InterviewResponseResponse;
import com.futureyou.backend.dto.MockInterviewRequest;
import com.futureyou.backend.dto.MockInterviewResponse;
import com.futureyou.backend.service.MockInterviewService;

@RestController
@RequestMapping("/interview")
public class MockInterviewController{

    private MockInterviewService mockInterviewService;

    
    public MockInterviewController(MockInterviewService mockInterviewService){
        this.mockInterviewService = mockInterviewService;
    }
    @PostMapping("/ask")
    public MockInterviewResponse generateInterviewQuestion(@RequestBody MockInterviewRequest request){
         return mockInterviewService.ask(request.getCareer() , request.getResumeText());
    }

    @PostMapping("/respond")
    public InterviewResponseResponse respond( @RequestBody InterviewResponseRequest request){
        return mockInterviewService.respond(
            request.getCareer(),
            request.getCurrentQuestion(),
            request.getAnswer(),
            request.getResumeText()
        );
    }

    @PostMapping("/evaluate")
    public InterviewEvaluationResponse evaluate( @RequestBody InterviewEvaluationRequest request ){
        return mockInterviewService.evaluate(
            request.getCareer(),
            request.getQuestions(),
            request.getAnswers(),
            request.getResumeText()
        );
    }


}