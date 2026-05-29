package com.futureyou.backend.dto;

import java.util.List;

public class SkillGapRequest {

    private String career;

    private List<String> skills;

    private List<String> strengths;

    public SkillGapRequest() {}

    public String getCareer() {
        return career;
    }

    public void setCareer(String career) {
        this.career = career;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(
        List<String> skills
    ) {
        this.skills = skills;
    }

    public List<String> getStrengths() {
        return strengths;
    }

    public void setStrengths(
        List<String> strengths
    ) {
        this.strengths = strengths;
    }
}