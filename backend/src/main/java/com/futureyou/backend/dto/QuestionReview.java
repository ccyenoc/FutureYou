package com.futureyou.backend.dto;

public class QuestionReview {

    private String question;

    private String answer;

    private String feedback;

    private String suggestedAnswer;

    public QuestionReview() {
    }

    public QuestionReview(
        String question,
        String answer,
        String feedback,
        String suggestedAnswer
    ) {
        this.question = question;
        this.answer = answer;
        this.feedback = feedback;
        this.suggestedAnswer = suggestedAnswer;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getSuggestedAnswer() {
        return suggestedAnswer;
    }

    public void setSuggestedAnswer(String suggestedAnswer) {
        this.suggestedAnswer = suggestedAnswer;
    }

    
}