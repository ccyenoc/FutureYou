package com.futureyou.backend.dto;

import java.util.List;

public class InterviewEvaluationResponse {

    private int overallScore;

    private int technicalScore;

    private int communicationScore;

    private int confidenceScore;

    private List<String> strengths;

    private List<String> weaknesses;

    private List<String> suggestions;

    public InterviewEvaluationResponse() {
    }

    public InterviewEvaluationResponse(
        int overallScore,
        int technicalScore,
        int communicationScore,
        int confidenceScore,
        List<String> strengths,
        List<String> weaknesses,
        List<String> suggestions
    ) {
        this.overallScore = overallScore;
        this.technicalScore = technicalScore;
        this.communicationScore = communicationScore;
        this.confidenceScore = confidenceScore;
        this.strengths = strengths;
        this.weaknesses = weaknesses;
        this.suggestions = suggestions;
    }

    public int getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(int overallScore) {
        this.overallScore = overallScore;
    }

    public int getTechnicalScore() {
        return technicalScore;
    }

    public void setTechnicalScore(int technicalScore) {
        this.technicalScore = technicalScore;
    }

    public int getCommunicationScore() {
        return communicationScore;
    }

    public void setCommunicationScore(int communicationScore) {
        this.communicationScore = communicationScore;
    }

    public int getConfidenceScore() {
        return confidenceScore;
    }

    public void setConfidenceScore(int confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public List<String> getStrengths() {
        return strengths;
    }

    public void setStrengths(List<String> strengths) {
        this.strengths = strengths;
    }

    public List<String> getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(List<String> weaknesses) {
        this.weaknesses = weaknesses;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }
}