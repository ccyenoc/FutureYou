package com.futureyou.backend.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futureyou.backend.dto.JobRequest;
import com.futureyou.backend.dto.JobsResponse;
import com.futureyou.backend.service.JobService;


@RestController
@RequestMapping("/jobs")
@CrossOrigin
public class JobOpeningController {

    private final JobService jobService;

    public JobOpeningController(
            JobService jobService
    ) {
        this.jobService = jobService;
    }

    @PostMapping
    public JobsResponse getJobs(
            @RequestBody JobRequest request
    ) {

        return jobService.getJobs(
                request.getCareer(),
                request.getJobType(),
                request.getRegion()
        );
    }
}