package com.futureyou.backend.dto;

public class MockInterviewRequest {

    private String career;
    private String resumeText;

    public MockInterviewRequest() {}

    public MockInterviewRequest(String career, String resumeText){
        this.career = career;
        this.resumeText  = resumeText;
    }

    public void setCareer(String career){
        this.career = career;
    }

    public String getCareer(){
        return career;
    }

    public void setResumeText(String resumeText){
        this.resumeText = resumeText;
    }

    public String getResumeText(){
        return resumeText;
    }
}