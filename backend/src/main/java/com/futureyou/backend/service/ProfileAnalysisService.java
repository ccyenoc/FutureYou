package com.futureyou.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.futureyou.backend.dto.ProfileAnalysisResponse;
import com.futureyou.backend.prompt.ProfileAnalysisPrompt;

@Service

public class ProfileAnalysisService{

    private final GeminiService geminiService;

    public ProfileAnalysisService(GeminiService geminiService){
        this.geminiService = geminiService;
    }

    public ProfileAnalysisResponse analyzeProfile(String resumeText){
        try {
            String prompt = 
            ProfileAnalysisPrompt.SYSTEM

            +

            "\n\nResume:\n"

            +

            resumeText;

            String response =
            geminiService.generate(prompt)
            .replace("```json", "")
            .replace("```", "")
            .trim();

            System.out.println(
                "Gemini Response:\n"
                +
                response
            );

            ObjectMapper mapper =
            new ObjectMapper();

            return mapper.readValue( response, ProfileAnalysisResponse.class );

        }
        catch(Exception err) {

            err.printStackTrace();

            return new ProfileAnalysisResponse(

                "Unknown",
                List.of(),
                List.of(),
                List.of(),
                List.of()
            );

        }

    }
}
