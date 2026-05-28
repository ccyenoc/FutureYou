package com.futureyou.backend.controller;

import com.futureyou.backend.service.ResumeService;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/resume")
@CrossOrigin
public class ResumeController{

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService){
        this.resumeService = resumeService;
    }

    @PostMapping("/upload")
    public String uploadResume(@RequestParam("file") MultipartFile file){
        return resumeService.extractText(file);
    }

}