package com.futureyou.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.futureyou.backend.dto.ProfileAnalysisResponse;
import com.futureyou.backend.service.ProfileAnalysisService;
import com.futureyou.backend.service.ResumeService;

@RestController
@RequestMapping("/resume")
@CrossOrigin
public class ResumeController{

    private final ResumeService resumeService;
    private final ProfileAnalysisService profileAnalysisService;

    public ResumeController(ResumeService resumeService , ProfileAnalysisService profileAnalysisService){
        this.resumeService = resumeService;
        this.profileAnalysisService = profileAnalysisService;
    }

    @PostMapping("/upload")
    public ProfileAnalysisResponse uploadResume(@RequestParam("file") MultipartFile file){
        String extractedText = resumeService.extractText(file);

        ProfileAnalysisResponse response = profileAnalysisService.analyzeProfile(extractedText);

        response.setResumeText(extractedText);


        return response;
    }

}