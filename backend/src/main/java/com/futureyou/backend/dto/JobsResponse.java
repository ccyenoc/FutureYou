package com.futureyou.backend.dto;

import java.util.List;

public class JobsResponse {

    private List<JobOpening> jobs;

    public JobsResponse() {
    }

    public JobsResponse(
        List<JobOpening> jobs
    ) {
        this.jobs = jobs;
    }

    public List<JobOpening> getJobs() {
        return jobs;
    }

    public void setJobs(
        List<JobOpening> jobs
    ) {
        this.jobs = jobs;
    }
}