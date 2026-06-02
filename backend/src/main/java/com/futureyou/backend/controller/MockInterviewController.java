package com.futureyou.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futureyou.backend.dto.InterviewEvaluationRequest;
import com.futureyou.backend.dto.InterviewEvaluationResponse;
import com.futureyou.backend.dto.InterviewReportResponse;
import com.futureyou.backend.dto.InterviewResponseRequest;
import com.futureyou.backend.dto.InterviewResponseResponse;
import com.futureyou.backend.dto.MockInterviewRequest;
import com.futureyou.backend.dto.MockInterviewResponse;
import com.futureyou.backend.entity.Interview;
import com.futureyou.backend.entity.User;
import com.futureyou.backend.service.InterviewService;
import com.futureyou.backend.service.MockInterviewService;
import com.futureyou.backend.service.UserService;

@RestController
@RequestMapping("/interview")
public class MockInterviewController{

    private MockInterviewService mockInterviewService;
    private final InterviewService interviewService;
    private final UserService userService;

    
    public MockInterviewController(MockInterviewService mockInterviewService, InterviewService interviewService, UserService userService){
        this.mockInterviewService = mockInterviewService;
        this.interviewService = interviewService;
        this.userService = userService;
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
    public InterviewEvaluationResponse evaluate( @RequestBody InterviewEvaluationRequest request ) {

        InterviewEvaluationResponse response =
                mockInterviewService.evaluate(
                        request.getCareer(),
                        request.getQuestions(),
                        request.getAnswers(),
                        request.getResumeText()
                );

        if (request.getUserId() != null) {
            User user = userService.getUserById( request.getUserId() );

            interviewService.saveInterview(
                    user,
                    request.getCareer(),
                    response
            );
        }

        return response;
    }

    @GetMapping("/user/{userId}")
    public List<Interview> getUserInterviews(@PathVariable Long userId){
        return interviewService.getUserInterview(userId);
    }

    @GetMapping("/report/{interviewId}")
    public InterviewReportResponse getInterviewReport(@PathVariable Long interviewId) {
        return interviewService.getInterviewReport( interviewId);
    }

}