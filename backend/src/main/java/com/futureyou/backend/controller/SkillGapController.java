package com.futureyou.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futureyou.backend.dto.SkillGapRequest;
import com.futureyou.backend.dto.SkillGapResponse;
import com.futureyou.backend.service.SkillGapService;

@RestController
@RequestMapping("/skill-gap")
@CrossOrigin
public class SkillGapController {

    private final SkillGapService service;

    public SkillGapController(
        SkillGapService service
    ) {
        this.service = service;
    }

    @PostMapping
    public SkillGapResponse analyze(
        @RequestBody SkillGapRequest request
    ) {

        return service.analyze(
            request.getCareer(),
            String.join(
                ", ",
                request.getSkills()
            ),
            String.join(
                ", ",
                request.getStrengths()
            )
        );
    }
}