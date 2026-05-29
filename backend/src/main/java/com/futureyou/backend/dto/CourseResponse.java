package com.futureyou.backend.dto;

import java.util.List;

public class CourseResponse {

    private List<CourseRecommendation> courses;

    public CourseResponse( List<CourseRecommendation> courses ){
        this.courses = courses;
    }

    public void setCourse(List<CourseRecommendation> courses){
        this.courses = courses;
    }

    public List<CourseRecommendation> getCourses(){
        return courses;
    }
    
}