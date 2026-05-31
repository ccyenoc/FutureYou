package com.futureyou.backend.dto;

public class InterviewResponseResponse {

    private String action;

    private String nextQuestion;

    public InterviewResponseResponse(){}

    public InterviewResponseResponse(String action, String nextQuestion){
        this.action = action;
        this.nextQuestion = nextQuestion;
    }

    public void setAction(String action){
        this.action = action;
    }

    public String getAction(){
        return action;
    }

    public void setNextQuestion(String nextQuestion){
        this.nextQuestion = nextQuestion;
    }

    public String getNextQuestion(){
        return nextQuestion;
    }

}