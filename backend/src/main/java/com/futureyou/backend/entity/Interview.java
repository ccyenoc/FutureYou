package com.futureyou.backend.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
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

    @Column(columnDefinition = "TEXT")
    private String strengthsText;

    @Column(columnDefinition = "TEXT")
    private String weaknessesText;

    @Column(columnDefinition = "TEXT")
    private String suggestionsText;

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

    public String getStrengthsText() {
        return strengthsText;
    }

    public void setStrengthsText(String strengthsText) {
        this.strengthsText = strengthsText;
    }

    public String getWeaknessesText() {
        return weaknessesText;
    }

    public void setWeaknessesText(String weaknessesText) {
        this.weaknessesText = weaknessesText;
    }

    public String getSuggestionsText() {
        return suggestionsText;
    }

    public void setSuggestionsText(String suggestionsText) {
        this.suggestionsText = suggestionsText;
    }

    public List<String> getStrengths() {
        if (strengthsText == null || strengthsText.isBlank()) {
            return List.of();
        }
        return List.of(strengthsText.split("\n"));
    }

    public void setStrengths(List<String> strengths) {
        this.strengthsText = strengths != null ? String.join("\n", strengths) : null;
    }

    public List<String> getWeaknesses() {
        if (weaknessesText == null || weaknessesText.isBlank()) {
            return List.of();
        }
        return List.of(weaknessesText.split("\n"));
    }

    public void setWeaknesses(List<String> weaknesses) {
        this.weaknessesText = weaknesses != null ? String.join("\n", weaknesses) : null;
    }

    public List<String> getSuggestions() {
        if (suggestionsText == null || suggestionsText.isBlank()) {
            return List.of();
        }
        return List.of(suggestionsText.split("\n"));
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestionsText = suggestions != null ? String.join("\n", suggestions) : null;
    }
}