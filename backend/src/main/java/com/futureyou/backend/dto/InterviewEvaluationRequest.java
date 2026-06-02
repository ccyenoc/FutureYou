package com.futureyou.backend.dto;

import java.util.List;

public class InterviewEvaluationRequest {

    private String career;

    private List<String> questions;

    private List<String> answers;

    private String resumeText;

    private Long userId;

    public InterviewEvaluationRequest() {
    }

    public InterviewEvaluationRequest(
        String career,
        List<String> questions,
        List<String> answers,
        String resumeText
    ) {
        this.career = career;
        this.questions = questions;
        this.answers = answers;
        this.resumeText = resumeText;
    }

    public String getCareer() {
        return career;
    }

    public void setCareer(String career) {
        this.career = career;
    }

    public List<String> getQuestions() {
        return questions;
    }

    public void setQuestions(List<String> questions) {
        this.questions = questions;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }

    public String getResumeText() {
        return resumeText;
    }

    public void setResumeText(String resumeText) {
        this.resumeText = resumeText;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}