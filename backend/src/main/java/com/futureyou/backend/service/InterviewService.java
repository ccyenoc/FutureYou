package com.futureyou.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.futureyou.backend.dto.InterviewEvaluationResponse;
import com.futureyou.backend.dto.InterviewReportResponse;
import com.futureyou.backend.entity.Interview;
import com.futureyou.backend.entity.QuestionReview;
import com.futureyou.backend.entity.User;
import com.futureyou.backend.repository.InterviewRepository;
import com.futureyou.backend.repository.QuestionReviewRepository;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final QuestionReviewRepository questionReviewRepository;

    public InterviewService(InterviewRepository interviewRepository,
            QuestionReviewRepository questionReviewRepository) {
        this.interviewRepository = interviewRepository;
        this.questionReviewRepository = questionReviewRepository;
    }

    public Interview saveInterview(User user, String career, InterviewEvaluationResponse response) {

        Interview interview = new Interview();

        interview.setUser(user);
        interview.setCareer(career);

        interview.setOverallScore(response.getOverallScore());

        interview.setProfessionalKnowledgeScore(response.getProfessionalKnowledgeScore());

        interview.setCommunicationScore(response.getCommunicationScore());

        interview.setStrengths(response.getStrengths());
        interview.setWeaknesses(response.getWeaknesses());
        interview.setSuggestions(response.getSuggestions());

        interview.setCreatedAt(LocalDateTime.now());

        Interview savedInterview = interviewRepository.save(interview);

        for (com.futureyou.backend.dto.QuestionReview review : response.getQuestionReview()) {

            QuestionReview entity = new QuestionReview();

            entity.setQuestion(review.getQuestion());

            entity.setAnswer(review.getAnswer());

            entity.setFeedback(review.getFeedback());

            entity.setSuggestedAnswer(review.getSuggestedAnswer());

            entity.setInterview(savedInterview);

            questionReviewRepository.save(entity);
        }

        return savedInterview;
    }

    public List<Interview> getUserInterview(Long userId) {
        return interviewRepository.findByUserId(userId);
    }

    public InterviewReportResponse getInterviewReport(Long interviewId) {

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));

        List<QuestionReview> reviews = questionReviewRepository.findByInterviewId(interviewId);

        InterviewReportResponse response = new InterviewReportResponse();

        response.setInterview(interview);
        response.setReviews(reviews);

        return response;
    }
}