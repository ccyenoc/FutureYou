package com.futureyou.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.futureyou.backend.dto.InterviewEvaluationResponse;
import com.futureyou.backend.dto.InterviewResponseResponse;
import com.futureyou.backend.dto.MockInterviewResponse;
import com.futureyou.backend.dto.QuestionReview;
import com.futureyou.backend.prompt.InterviewEvaluationPrompt;
import com.futureyou.backend.prompt.InterviewResponsePrompt;
import com.futureyou.backend.prompt.MockInterviewPrompt;

@Service

public class MockInterviewService{

    private GeminiService geminiService;

    public MockInterviewService(GeminiService geminiService){
        this.geminiService = geminiService;
    }

    public MockInterviewResponse ask(String career, String resumeText){
        try{
            String prompt = 
            MockInterviewPrompt.SYSTEM
            .replace("{career}",career)
            .replace("{resumeText}",resumeText);

            String response = 
            geminiService.generate(prompt)
            .replace("```json", "")
            .replace("```", "")
            .trim();

            int start = response.indexOf("{");
            int end = response.lastIndexOf("}");

            if (start != -1 && end != -1) {
                response = response.substring(start, end + 1 );
            }

            System.out.println( "Interview Questions:\n" + response );

            ObjectMapper mapper = new ObjectMapper();

            return mapper.readValue( response, MockInterviewResponse.class );

        }
        catch(Exception e){
            e.printStackTrace();
            return new MockInterviewResponse(
                java.util.List.of()
            );
        }
    }

    public InterviewResponseResponse respond(
    String career,
    String currentQuestion,
    String answer,
    String resumeText
    ){
        try{

        String prompt =
        InterviewResponsePrompt.SYSTEM
        .replace("{career}", career)
        .replace("{resumeText}", resumeText)
        .replace("{currentQuestion}", currentQuestion)
        .replace("{answer}", answer);

        String response =
        geminiService.generate(prompt)
        .replace("```json", "")
        .replace("```", "")
        .trim();

        System.out.println("Interview Response:");
        System.out.println(response);

        int start = response.indexOf("{");
        int end = response.lastIndexOf("}");

        if(start != -1 && end != -1){
            response = response.substring(start, end + 1);
        }

        ObjectMapper mapper = new ObjectMapper();

        return mapper.readValue( response, InterviewResponseResponse.class );

        }catch(Exception e){

            e.printStackTrace();

            return new InterviewResponseResponse( "NEXT", null );
        }
    }

   public InterviewEvaluationResponse evaluate(
        String career,
        List<String> questions,
        List<String> answers,
        String resumeText
    ){
        try {

            String prompt =
                InterviewEvaluationPrompt.SYSTEM
                    .replace("{career}", career == null ? "" : career)
                    .replace("{resumeText}", resumeText == null ? "" : resumeText)
                    .replace("{questions}", questions.toString())
                    .replace("{answers}", answers.toString());

            String response =
                geminiService.generate(prompt)
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            int start = response.indexOf("{");
            int end = response.lastIndexOf("}");

            if(start != -1 && end != -1){
                response = response.substring(start, end + 1);
            }

            ObjectMapper mapper = new ObjectMapper();

            return mapper.readValue(
                response,
                InterviewEvaluationResponse.class
            );

        } catch(Exception e) {

            e.printStackTrace();

            return getMockEvaluation(); 
        }
    }

    private InterviewEvaluationResponse getMockEvaluation() {

    InterviewEvaluationResponse response =
            new InterviewEvaluationResponse();

    response.setOverallScore(82);
    response.setProfessionalKnowledgeScore(78);
    response.setCommunicationScore(88);

    response.setStrengths(List.of(
            "Clear communication skills",
            "Good project explanation",
            "Positive attitude toward learning",
            "Able to structure answers logically"
    ));

    response.setWeaknesses(List.of(
            "Answers sometimes lack specific examples",
            "Limited use of measurable achievements",
            "Could demonstrate more confidence in technical discussions"
    ));

    response.setSuggestions(List.of(
            "Use the STAR method for behavioural questions",
            "Include metrics and outcomes when describing projects",
            "Research the company before interviews",
            "Practice answering technical questions more concisely"
    ));

    response.setQuestionReview(List.of(

            new QuestionReview(
                    "Tell me about yourself.",
                    "I am a Computer Science student who enjoys building full-stack applications and solving real-world problems.",
                    "Good introduction with a clear overview of your background. However, mentioning a specific achievement would make the answer stronger.",
                    "I am a Computer Science student with experience building full-stack applications using Spring Boot and React. Recently, I developed a career guidance platform that helps students explore career paths through AI-powered recommendations."
            )
    ));

    return response;
}
}


    

