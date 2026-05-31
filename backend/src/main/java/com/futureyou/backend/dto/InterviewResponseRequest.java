package com.futureyou.backend.dto;

public class InterviewResponseRequest {

    private String career;

    private String currentQuestion;

    private String answer;

    private String resumeText;

    private int followUpCount;

    public InterviewResponseRequest() {
    }

    public InterviewResponseRequest(
        String career, 
        String currentQuestion , 
        String answer, 
        String resumeText,
        int followUpCount){

            this.career = career;
            this.currentQuestion = currentQuestion;
            this.answer = answer;
            this.resumeText = resumeText;
            this.followUpCount = followUpCount;
    }

    public void setCareer(String career){
        this.career = career;
    }

    public String getCareer(){
        return career;
    }

    public void setCurrentQuestion(String currentQuestion){
        this.currentQuestion = currentQuestion;
    }

    public String getCurrentQuestion(){
        return currentQuestion;
    }

    public void setAnswer(String answer){
        this.answer = answer;
    }

    public String getAnswer(){
        return answer;
    }

    public void setResumeText(String resumeText){
        this.resumeText = resumeText;
    }

    public String getResumeText(){
        return resumeText;
    }

    public void setFollowUpCount(int followUpCount){
        this.followUpCount = followUpCount;
    }

    public int getFollowUpCount(){
        return followUpCount;
    }

}