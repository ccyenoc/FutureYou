package com.futureyou.backend.dto;

import java.util.List;

public class SkillGapResponse {

    private List<String> missingSkills;

    private List<String> recommendedLearning;

    private String summary;

    public SkillGapResponse(
        List<String> missingSkills , 
        List<String> recommendedLearning , 
        String summary 
    ) {

        this.missingSkills = missingSkills;
        this.recommendedLearning = recommendedLearning;
        this.summary = summary;
    }

    public void setMissingSkills(List<String> missingSkills){
        this.missingSkills = missingSkills;
    }

    public List<String> getMissingSkills(){
        return missingSkills;
    }

    public void setRecommendedLearning(List<String> recommendedLearning){
        this.recommendedLearning = recommendedLearning;
    }

    public List<String> getRecommendedLearning(){
        return recommendedLearning;
    }

    public void setSummary(String summary){
        this.summary = summary;
    }

    public String getSummary(){
        return summary;
    }
    
}