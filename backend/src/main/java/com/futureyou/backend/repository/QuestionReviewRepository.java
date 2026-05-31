package com.futureyou.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.futureyou.backend.entity.QuestionReview;

public interface QuestionReviewRepository extends JpaRepository<QuestionReview, Long> {

    List<QuestionReview> findByInterviewId( Long interviewId );

}