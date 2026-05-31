package com.futureyou.backend.service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

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

        try {

            // Normalize career titles
            String query = career;

            if (career.toLowerCase().contains("full-stack")) {
                query = "Full Stack Developer";
            }
            else if (career.toLowerCase().contains("mobile")) {
                query = "Mobile Developer";
            }
            else if (career.toLowerCase().contains("ai")) {
                query = "Software Engineer";
            }

            // Country mapping
            String country = "my";

            if (region != null && !region.isBlank()) {

                if (region.equalsIgnoreCase("Singapore")) {
                    country = "sg";
                }
                else if (
                    region.equalsIgnoreCase("United States")
                    || region.equalsIgnoreCase("USA")
                ) {
                    country = "us";
                }
                else if (
                    region.equalsIgnoreCase("United Kingdom")
                    || region.equalsIgnoreCase("UK")
                ) {
                    country = "gb";
                }
            }

            String encodedQuery =
                URLEncoder.encode(
                    query,
                    StandardCharsets.UTF_8
                );

            String url =
                "https://jsearch.p.rapidapi.com/search"
                + "?query=" + encodedQuery
                + "&page=1"
                + "&num_pages=1"
                + "&country=" + country
                + "&date_posted=all";

            System.out.println("JSEARCH URL:");
            System.out.println(url);

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

            System.out.println("RAW JSEARCH RESPONSE:");
            System.out.println(response.getBody());

            return response.getBody();

        }
        catch (Exception e) {

            e.printStackTrace();

            return """
            {
              "data":[]
            }
            """;
        }
    }
}