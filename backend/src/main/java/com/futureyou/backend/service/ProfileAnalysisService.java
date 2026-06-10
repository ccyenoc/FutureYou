package com.futureyou.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.futureyou.backend.dto.ProfileAnalysisResponse;
import com.futureyou.backend.prompt.ProfileAnalysisPrompt;

@Service

public class ProfileAnalysisService {

    private final GeminiService geminiService;

    public ProfileAnalysisService(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    public ProfileAnalysisResponse analyzeProfile(String resumeText) {
        try {
            String prompt = ProfileAnalysisPrompt.SYSTEM

                    +

                    "\n\nResume:\n"

                    +

                    resumeText;

            System.out.println(
                    "Sending resume to Gemini...");

            String response = geminiService.generate(prompt).trim();

            if (!response.startsWith("{")) {

                System.out.println("Invalid Gemini response:");
                System.out.println(response);

                throw new RuntimeException("Gemini did not return valid JSON");
            }

            ObjectMapper mapper = new ObjectMapper();

            System.out.println("Gemini Response:");
            System.out.println(response);

            JsonNode node = mapper.readTree(response);

            return mapper.treeToValue(
                    node,
                    ProfileAnalysisResponse.class);

        } catch (Exception err) {

            err.printStackTrace();

            return new ProfileAnalysisResponse(

                    "Unknown",
                    List.of(),
                    List.of(),
                    List.of(),
                    List.of(),
                    List.of(),
                    "Unknown");

        }

    }
}
