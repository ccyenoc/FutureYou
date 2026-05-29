package com.futureyou.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.futureyou.backend.dto.TavilyRequest;

@Service

public class TavilyService{

    @Value("${tavily.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String searchJobs(String query) {

    String url =
        "https://api.tavily.com/search";

    TavilyRequest request = new TavilyRequest( query, apiKey ,15 );

    return restTemplate.postForObject(
        url,
        request,
        String.class
    );
}
}

