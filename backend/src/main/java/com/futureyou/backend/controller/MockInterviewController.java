package com.futureyou.backend.controller;

import java.util.List;

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
import com.futureyou.backend.dto.QuestionReview;
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

    /*real working backend
    @PostMapping("/evaluate")
    public InterviewEvaluationResponse evaluate( @RequestBody InterviewEvaluationRequest request ){
        return mockInterviewService.evaluate(
            request.getCareer(),
            request.getQuestions(),
            request.getAnswers(),
            request.getResumeText()
        );
    }
    */

   @PostMapping("/evaluate")
public InterviewEvaluationResponse evaluate(
        @RequestBody InterviewEvaluationRequest request) {

    InterviewEvaluationResponse response =
            new InterviewEvaluationResponse();

    response.setOverallScore(82);
    response.setCommunicationScore(85);
    response.setConfidenceScore(78);
    response.setTechnicalScore(80);

   response.setStrengths(List.of(
    "Clear communication skills",
    "Good project explanations",
    "Positive attitude"
));

response.setWeaknesses(List.of(
    "Answers lack specific examples",
    "Could use STAR method more consistently"
));

response.setSuggestions(List.of(
    "Use STAR method for behavioural questions",
    "Include measurable achievements",
    "Research company-specific information before interviews"
));

response.setQuestionReview(List.of(
    new QuestionReview(
        "Tell me about yourself",
        "I am a Computer Science student...",
        "Good introduction but could include more achievements.",
        "I am a Computer Science student with experience building full-stack applications..."
    ),
    new QuestionReview(
        "Why do you want to join EY?",
        "EY is a large company with many opportunities.",
        "Answer is too generic.",
        "I am interested in EY's technology consulting and learning culture..."
    )
));
    return response;
}


}