package com.futureyou.backend.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonAlias;

public class InterviewEvaluationResponse {

    private int overallScore;

    private int communicationScore;

    private int professionalKnowledgeScore;

    private List<String> strengths;

    private List<String> weaknesses;

    private List<String> suggestions;

    @JsonAlias("reviews")
    private List<QuestionReview> questionReview;

    public InterviewEvaluationResponse() {
    }

    public InterviewEvaluationResponse(
        int overallScore,
        int professionalKnowledgeScore,
        int communicationScore,
        List<String> strengths,
        List<String> weaknesses,
        List<String> suggestions,
        List<QuestionReview> questionReview
    ) {
        this.overallScore = overallScore;
        this.professionalKnowledgeScore = professionalKnowledgeScore;
        this.communicationScore = communicationScore;
        this.strengths = strengths;
        this.weaknesses = weaknesses;
        this.suggestions = suggestions;
        this.questionReview = questionReview;
    }

    public int getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(int overallScore) {
        this.overallScore = overallScore;
    }

    public int getProfessionalKnowledgeScore() {
        return professionalKnowledgeScore;
    }

    public void setProfessionalKnowledgeScore(int professionalKnowledgeScore) {
        this.professionalKnowledgeScore = professionalKnowledgeScore;
    }

    public int getCommunicationScore() {
       return communicationScore;
    }

    public void setCommunicationScore(int communicationScore) {
        this.communicationScore = communicationScore;
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

    public List<QuestionReview> getQuestionReview() {
        return questionReview;
    }

    public void setQuestionReview(List<QuestionReview> questionReview) {
        this.questionReview = questionReview;
    }
}