package com.futureyou.backend.dto;

import java.util.List;

public class RoadmapPhase {

    private String phase;

    private String duration;

    private List<String> items;

    public RoadmapPhase() {
    }

    public RoadmapPhase(
        String phase,
        String duration,
        List<String> items
    ) {
        this.phase = phase;
        this.duration = duration;
        this.items = items;
    }

    public String getPhase() {
        return phase;
    }

    public void setPhase(String phase) {
        this.phase = phase;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }
}