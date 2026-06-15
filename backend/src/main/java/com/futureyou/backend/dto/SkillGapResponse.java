package com.futureyou.backend.dto;

import java.util.List;

public class SkillGapResponse {

    private List<String> matchedSkills;

    private List<String> missingHardSkills;

    private List<String> missingSoftSkills;

    private List<String> topPrioritySkills;

    public SkillGapResponse() {}

    public SkillGapResponse(
        List<String> matchedSkills,
        List<String> missingHardSkills,
        List<String> missingSoftSkills,
        List<String> topPrioritySkills
    ) {
        this.matchedSkills = matchedSkills;
        this.missingHardSkills = missingHardSkills;
        this.missingSoftSkills = missingSoftSkills;
        this.topPrioritySkills = topPrioritySkills;
    }

    public List<String> getMatchedSkills() {
        return matchedSkills;
    }

    public void setMatchedSkills(
        List<String> matchedSkills
    ) {
        this.matchedSkills = matchedSkills;
    }

    public List<String> getMissingHardSkills() {
        return missingHardSkills;
    }

    public void setMissingHardSkills(
        List<String> missingHardSkills
    ) {
        this.missingHardSkills =
        missingHardSkills;
    }

    public List<String> getMissingSoftSkills() {
        return missingSoftSkills;
    }

    public void setMissingSoftSkills(
        List<String> missingSoftSkills
    ) {
        this.missingSoftSkills =
        missingSoftSkills;
    }

    public List<String> getTopPrioritySkills() {
        return topPrioritySkills;
    }

    public void setTopPrioritySkills(
        List<String> topPrioritySkills
    ) {
        this.topPrioritySkills =
        topPrioritySkills;
    }
}