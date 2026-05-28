package com.futureyou.backend.dto;

import java.util.List;

public class ProfileAnalysisResponse {

    private String domain;

    private List<String> skills;

    private List<String> strengths;

    private List<String> interests;

    private List<String> workStyle;

    private List<CareerRecommendation> careers;

    public ProfileAnalysisResponse() {
    }

    public ProfileAnalysisResponse(
        String domain,
        List<String> skills,
        List<String> strengths,
        List<String> interests,
        List<String> workStyle,
        List<CareerRecommendation> careers
    ) {
        this.domain = domain;
        this.skills = skills;
        this.strengths = strengths;
        this.interests = interests;
        this.workStyle = workStyle;
        this.careers = careers;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<String> getStrengths() {
        return strengths;
    }

    public void setStrengths(List<String> strengths) {
        this.strengths = strengths;
    }

    public List<String> getInterests() {
        return interests;
    }

    public void setInterests(List<String> interests) {
        this.interests = interests;
    }

    public List<String> getWorkStyle() {
        return workStyle;
    }

    public void setWorkStyle(List<String> workStyle) {
        this.workStyle = workStyle;
    }

    public List<CareerRecommendation> getCareers() {
        return careers;
    }

    public void setCareers(List<CareerRecommendation> careers) {
        this.careers = careers;
    }

}