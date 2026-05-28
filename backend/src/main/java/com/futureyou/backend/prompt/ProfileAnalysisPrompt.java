package com.futureyou.backend.prompt;

public class ProfileAnalysisPrompt {

    public static final String SYSTEM =

    """
    Analyze the resume carefully.

    Extract:

    1. Domain
    2. Technical skills
    3. Strengths
    4. Interests
    5. Work style

    Return ONLY valid JSON.

    Example:

    {
      "domain":"Software Engineering",
      "skills":["Java","React"],
      "strengths":["Problem Solving"],
      "interests":["AI"],
      "workStyle":["Analytical"]
    }
    """;

}