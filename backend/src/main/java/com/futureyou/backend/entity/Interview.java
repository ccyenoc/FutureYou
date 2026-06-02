package com.futureyou.backend.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "interviews")
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String career;

    private Integer overallScore;

    private Integer professionalKnowledgeScore;

    private Integer communicationScore;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "interview")
    @JsonIgnore
    private List<QuestionReview> questionReviews;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Interview() {
    }

    public Interview(
            Long id,
            String career,
            Integer overallScore,
            Integer professionalKnowledgeScore,
            Integer communicationScore,
            LocalDateTime createdAt,
            User user
    ) {
        this.id = id;
        this.career = career;
        this.overallScore = overallScore;
        this.professionalKnowledgeScore = professionalKnowledgeScore;
        this.communicationScore = communicationScore;
        this.createdAt = createdAt;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCareer() {
        return career;
    }

    public void setCareer(String career) {
        this.career = career;
    }

    public Integer getOverallScore() {
        return overallScore;
    }

    public void setOverallScore(Integer overallScore) {
        this.overallScore = overallScore;
    }

    public Integer getProfessionalKnowledgeScore() {
        return professionalKnowledgeScore;
    }

    public void setProfessionalKnowledgeScore(Integer professionalKnowledgeScore) {
        this.professionalKnowledgeScore = professionalKnowledgeScore;
    }

    public Integer getCommunicationScore() {
        return communicationScore;
    }

    public void setCommunicationScore(Integer communicationScore) {
        this.communicationScore = communicationScore;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}