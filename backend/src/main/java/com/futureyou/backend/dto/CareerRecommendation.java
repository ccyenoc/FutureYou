package com.futureyou.backend.dto;

import java.util.List;

public class CareerRecommendation {

    private String title;

    private String reasoning;

    private int futurePotential;

    private int salaryPotential;

    private int growthPotential;

    private List<RoadmapPhase> roadmap;

    public CareerRecommendation() {
    }

    public CareerRecommendation(
        String title,
        String reasoning,
        int futurePotential,
        int salaryPotential,
        int growthPotential,
        List<RoadmapPhase> roadmap
    ) {
        this.title = title;
        this.reasoning = reasoning;
        this.futurePotential = futurePotential;
        this.salaryPotential = salaryPotential;
        this.growthPotential = growthPotential;
        this.roadmap = roadmap;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getReasoning() {
        return reasoning;
    }

    public void setReasoning(String reasoning) {
        this.reasoning = reasoning;
    }

    public int getFuturePotential() {
        return futurePotential;
    }

    public void setFuturePotential(int futurePotential) {
        this.futurePotential = futurePotential;
    }

    public int getSalaryPotential() {
        return salaryPotential;
    }

    public void setSalaryPotential(int salaryPotential) {
        this.salaryPotential = salaryPotential;
    }

    public int getGrowthPotential() {
        return growthPotential;
    }

    public void setGrowthPotential(int growthPotential) {
        this.growthPotential = growthPotential;
    }

    public List<RoadmapPhase> getRoadmap() {
        return roadmap;
    }

    public void setRoadmap(List<RoadmapPhase> roadmap) {
        this.roadmap = roadmap;
    }
}