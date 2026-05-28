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
    6. Top 3 future career recommendations

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
    - careers

    careers must contain EXACTLY 3 career objects.

    Each career object must contain:

    - title
    - reasoning
    - futurePotential
    - salaryPotential
    - growthPotential
    - roadmap

    futurePotential, salaryPotential,
    and growthPotential must be integers
    between 1-100.

    roadmap must contain EXACTLY 4 phases.

    Each roadmap phase must contain:

    - phase
    - duration
    - items

    items must contain EXACTLY 3 actionable tasks.

    Example:

    {
      "domain":"Software Engineering",

      "skills":[
        "Java",
        "React"
      ],

      "strengths":[
        "Problem Solving"
      ],

      "interests":[
        "AI"
      ],

      "workStyle":[
        "Analytical"
      ],

      "careers":[

        {
          "title":"AI Engineer",

          "reasoning":
          "Strong programming and analytical skills suitable for AI systems development.",

          "futurePotential":95,

          "salaryPotential":90,

          "growthPotential":94,

          "roadmap":[

            {
              "phase":"Foundation",

              "duration":"0-3 months",

              "items":[
                "Master Python fundamentals",
                "Learn machine learning basics",
                "Build small AI projects"
              ]
            },

            {
              "phase":"Build & Explore",

              "duration":"3-6 months",

              "items":[
                "Learn TensorFlow or PyTorch",
                "Deploy simple ML models",
                "Participate in AI hackathons"
              ]
            },

            {
              "phase":"Specialize",

              "duration":"6-12 months",

              "items":[
                "Focus on NLP or Computer Vision",
                "Build portfolio projects",
                "Contribute to open source AI projects"
              ]
            },

            {
              "phase":"Launch",

              "duration":"12+ months",

              "items":[
                "Apply for AI internships",
                "Optimize resume and portfolio",
                "Network with AI professionals"
              ]
            }

          ]
        }

      ]
    }
    """;

}