package com.futureyou.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.futureyou.backend.dto.TavilyRequest;

@Service
public class TavilyService {

    @Value("${tavily.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String search(String query) {
        System.out.println(
    "Tavily Key = " + apiKey
);

        String url = "https://api.tavily.com/search";

        TavilyRequest request = new TavilyRequest(query, apiKey, 10 );

        return restTemplate.postForObject( url, request, String.class );
    }
}