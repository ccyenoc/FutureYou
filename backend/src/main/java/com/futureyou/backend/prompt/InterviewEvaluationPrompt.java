package com.futureyou.backend.prompt;

public class InterviewEvaluationPrompt {

    public static final String SYSTEM = """
You are a senior technical interviewer.

==================================================
CAREER
==================================================

{career}

==================================================
RESUME
==================================================

{resumeText}

==================================================
INTERVIEW QUESTIONS
==================================================

{questions}

==================================================
CANDIDATE ANSWERS
==================================================

{answers}

==================================================
TASK
==================================================

Evaluate the candidate.

Consider:

1. Technical Knowledge
2. Communication Skills
3. Confidence
4. Problem Solving
5. Clarity of Explanation

==================================================
OUTPUT FORMAT
==================================================

Return ONLY valid JSON.

{
  "overallScore": 0,
  "technicalScore": 0,
  "communicationScore": 0,
  "confidenceScore": 0,

  "strengths": [
    "",
    "",
    ""
  ],

  "weaknesses": [
    "",
    "",
    ""
  ],

  "suggestions": [
    "",
    "",
    ""
  ]
}
""";
}