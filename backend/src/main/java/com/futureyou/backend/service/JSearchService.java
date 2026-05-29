package com.futureyou.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class JSearchService {

    @Value("${jsearch.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate =
        new RestTemplate();

    public String searchJobs(
        String career,
        String jobType,
        String region
    ) {

        String query =
            career + " " + jobType;

        String url =
            "https://jsearch.p.rapidapi.com/search-v2"
            + "?query=" + query.replace(" ", "%20")
            + "&page=1"
            + "&num_pages=1"
            + "&country=my"
            + "&date_posted=all";

        HttpHeaders headers =
            new HttpHeaders();

        headers.set(
            "X-RapidAPI-Key",
            apiKey
        );

        headers.set(
            "X-RapidAPI-Host",
            "jsearch.p.rapidapi.com"
        );

        HttpEntity<String> entity =
            new HttpEntity<>(headers);

        ResponseEntity<String> response =
            restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
            );

        return response.getBody();
    }
}