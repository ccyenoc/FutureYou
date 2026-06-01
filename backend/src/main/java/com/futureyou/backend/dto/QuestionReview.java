package com.futureyou.backend.dto;

import java.util.List;

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

    public InterviewEvaluationResponse getMockEvaluation() {

    return new InterviewEvaluationResponse(
        82, // overall
        78, // technical
        88, // communication
        80, // confidence

        List.of(
            "Clear communication skills",
            "Good project explanation",
            "Positive attitude toward learning",
            "Able to structure answers logically"
        ),

        List.of(
            "Answers sometimes lack specific examples",
            "Limited use of measurable achievements",
            "Could demonstrate more confidence in technical discussions"
        ),

        List.of(
            "Use the STAR method for behavioural questions",
            "Include metrics and outcomes when describing projects",
            "Research the company before interviews",
            "Practice answering technical questions more concisely"
        ),

        List.of(

            new QuestionReview(
                "Tell me about yourself.",
                "I am a Computer Science student who enjoys building full-stack applications and solving real-world problems.",
                "Good introduction with a clear overview of your background. However, mentioning a specific achievement would make the answer stronger.",
                "I am a Computer Science student with experience building full-stack applications using Spring Boot and React. Recently, I developed a career guidance platform that helps students explore career paths through AI-powered recommendations."
            ),

            new QuestionReview(
                "Why do you want to join EY?",
                "I want to join EY because it is a large company with many opportunities.",
                "The answer is too generic. It does not show knowledge of EY's values, culture, or technology practice.",
                "I would like to join EY because of its strong reputation in consulting and technology transformation. I am particularly interested in EY's focus on innovation and continuous learning, which aligns with my goal of developing both technical and business skills."
            ),

            new QuestionReview(
                "What motivates you to wake up every day?",
                "I am motivated by curiosity and discovering new things every day.",
                "Authentic and engaging answer. Adding a real-life example would make it more memorable.",
                "I am motivated by curiosity and the opportunity to learn something new every day. Whether it is discovering a new technology, solving a challenging problem, or learning from other people, I enjoy continuous growth and improvement."
            )

        )
    );
}
}