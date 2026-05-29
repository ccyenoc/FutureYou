package com.futureyou.backend.dto;

public class CourseRecommendation {

    private String title;

    private String provider;

    private String description;

    private String url;

    public CourseRecommendation() {}

    public void setTitle(String title){
        this.title = title;
    }

    public String getTitle(){
        return title;
    }

    public void setProvider(String provider){
        this.provider = provider;
    }

    public String getProvider(){
        return provider;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public String getDescription(){
        return description;
    }

    public void setUrl(String url){
        this.url = url;
    }

    public String getUrl(){
        return url;
    }
}