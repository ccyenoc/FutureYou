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
            org.springframework.security.core.Authentication auth = 
                    org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
                throw new RuntimeException("Unauthorized: Must login to save interview evaluation.");
            }
            Long authenticatedUserId = (Long) auth.getPrincipal();
            if (!request.getUserId().equals(authenticatedUserId)) {
                throw new RuntimeException("Unauthorized user ID mismatch.");
            }

            User user = userService.getUserById( authenticatedUserId );

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
        Long authenticatedUserId = (Long) org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        if (!userId.equals(authenticatedUserId)) {
            throw new RuntimeException("Unauthorized: Cannot view another user's interview history.");
        }
        return interviewService.getUserInterview(userId);
    }

    @GetMapping("/report/{interviewId}")
    public InterviewReportResponse getInterviewReport(@PathVariable Long interviewId) {
        Long authenticatedUserId = (Long) org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        InterviewReportResponse report = interviewService.getInterviewReport( interviewId);
        if (report.getInterview().getUser() != null && !report.getInterview().getUser().getId().equals(authenticatedUserId)) {
            throw new RuntimeException("Unauthorized: You do not own this interview report.");
        }
        return report;
    }

}