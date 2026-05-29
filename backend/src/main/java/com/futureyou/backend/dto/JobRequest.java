package com.futureyou.backend.dto;

public class JobRequest {

    private String career;

    private String jobType;

    private String region;

    public JobRequest() {
    }

    public JobRequest(
        String career,
        String jobType,
        String region
    ) {
        this.career = career;
        this.jobType = jobType;
        this.region = region;
    }

    public String getCareer() {
        return career;
    }

    public void setCareer(String career) {
        this.career = career;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }
}