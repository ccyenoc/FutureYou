package com.futureyou.backend.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.futureyou.backend.dto.InterviewEvaluationResponse;
import com.futureyou.backend.dto.InterviewResponseResponse;
import com.futureyou.backend.dto.MockInterviewResponse;
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
        java.util.List<String> questions,
        java.util.List<String> answers,
        String resumeText
    ){
        try{

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
                response = response.substring( start, end + 1 );
            }

            ObjectMapper mapper = new ObjectMapper();

            return mapper.readValue( response, InterviewEvaluationResponse.class );

        }catch(Exception e){

            e.printStackTrace();

            return new InterviewEvaluationResponse(
                0,
                0,
                0,
                0,
                java.util.List.of(),
                java.util.List.of(),
                java.util.List.of(),
                java.util.List.of()
            );
        }
    }
}


    

