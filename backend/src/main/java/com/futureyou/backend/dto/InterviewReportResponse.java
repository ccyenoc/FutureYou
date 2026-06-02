package com.futureyou.backend.dto;

import java.util.List;

import com.futureyou.backend.entity.Interview;
import com.futureyou.backend.entity.QuestionReview;

public class InterviewReportResponse {

    private Interview interview;

    private List<QuestionReview> reviews;

    public Interview getInterview() {
        return interview;
    }

    public void setInterview(Interview interview) {
        this.interview = interview;
    }

    public List<QuestionReview> getReviews() {
        return reviews;
    }

    public void setReviews(List<QuestionReview> reviews) {
        this.reviews = reviews;
    }
}