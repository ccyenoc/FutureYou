package com.futureyou.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.futureyou.backend.dto.ProfileAnalysisResponse;
import com.futureyou.backend.entity.User;
import com.futureyou.backend.service.ProfileAnalysisService;
import com.futureyou.backend.service.ResumeService;
import com.futureyou.backend.service.UserService;

@RestController
@RequestMapping("/resume")
@CrossOrigin
public class ResumeController{

    private final ResumeService resumeService;
    private final ProfileAnalysisService profileAnalysisService;
    private final UserService userService;

    public ResumeController(ResumeService resumeService , ProfileAnalysisService profileAnalysisService,UserService userService){
        this.resumeService = resumeService;
        this.profileAnalysisService = profileAnalysisService;
        this.userService = userService;
    }

    @PostMapping("/upload-save")
    public ProfileAnalysisResponse uploadResume( @RequestParam("file") MultipartFile file, @RequestParam("userId") Long userId ) {

        User user = userService.getUserById(userId);

        String extractedText = resumeService.extractText(file);

        resumeService.saveResume( user, file, extractedText);

        ProfileAnalysisResponse response = profileAnalysisService.analyzeProfile( extractedText );

        response.setResumeText( extractedText );

        return response;
    }

    @PostMapping("/upload")
    public ProfileAnalysisResponse uploadResume(@RequestParam("file") MultipartFile file){

        String extractedText = resumeService.extractText(file);

        ProfileAnalysisResponse response = profileAnalysisService.analyzeProfile(extractedText);

        response.setResumeText(extractedText);

        return response;
    }

}