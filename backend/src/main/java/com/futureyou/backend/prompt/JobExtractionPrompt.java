package com.futureyou.backend.prompt;

public class JobExtractionPrompt {

    public static final String SYSTEM = """
    You are a job extraction engine.

    From the search results provided,
    identify ONLY actual job openings.

    IGNORE:

    - search result pages
    - category pages
    - career advice pages
    - expired jobs
    - closed applications
    - jobs marked unavailable
    - jobs no longer accepting applicants
    - archived jobs
    - jobs older than 60 days if mentioned

    Prefer:

    - active openings
    - recent openings
    - jobs with application links
    - jobs currently hiring

    Return ONLY valid JSON.

    Format:

    {
      "jobs":[
        {
          "title":"",
          "company":"",
          "location":"",
          "type":"",
          "url":""
        }
      ]
    }
    """;
}