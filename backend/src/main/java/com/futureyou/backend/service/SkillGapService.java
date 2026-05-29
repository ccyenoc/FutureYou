package com.futureyou.backend.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.futureyou.backend.dto.SkillGapResponse;
import com.futureyou.backend.prompt.SkillGapPrompt;

@Service
public class SkillGapService {

    private final GeminiService geminiService;

    public SkillGapService(
        GeminiService geminiService
    ) {
        this.geminiService = geminiService;
    }

    public SkillGapResponse analyze(
        String career,
        String skills,
        String strengths
    ) {

        try {

            String prompt =
            SkillGapPrompt.SYSTEM
            +
            "\n\nCareer:\n"
            +
            career
            +
            "\n\nSkills:\n"
            +
            skills
            +
            "\n\nStrengths:\n"
            +
            strengths;

            String response =
            geminiService.generate(prompt)
            .replace("```json", "")
            .replace("```", "")
            .trim();

            ObjectMapper mapper =
            new ObjectMapper();

            return mapper.readValue(
                response,
                SkillGapResponse.class
            );

        } catch (Exception e) {

            e.printStackTrace();

            return new SkillGapResponse();
        }
    }
}