package com.futureyou.backend.dto;

import java.util.List;

public class MockInterviewResponse {

    private List<String> questions;

    public MockInterviewResponse() {
    }

    public MockInterviewResponse(
        List<String> questions
    ) {
        this.questions = questions;
    }

    public List<String> getQuestions() {
        return questions;
    }

    public void setQuestions(
        List<String> questions
    ) {
        this.questions = questions;
    }
}