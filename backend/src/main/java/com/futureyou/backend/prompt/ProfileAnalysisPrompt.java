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

    IMPORTANT:

    Return ONLY raw valid JSON.

    Do NOT:
    - explain anything
    - add markdown
    - add ```json
    - add extra text

    Use EXACTLY these keys:

    - domain
    - skills
    - strengths
    - interests
    - workStyle

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