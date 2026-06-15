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

    private final RestTemplate restTemplate = new RestTemplate();

    public String searchJobs(
            String career,
            String jobType,
            String region) {

        try {

            // normalize career titles by removing parenthetical details (e.g., "Full-Stack
            String query = career != null ? career.replaceAll("\\s*\\([^)]*\\)", "").trim() : "";

            String queryWithRegion = query;
            if (region != null && !region.isBlank()) {
                queryWithRegion += " in " + region.trim();
            }

            String encodedQuery = URLEncoder.encode(queryWithRegion, StandardCharsets.UTF_8);

            String url = "https://jsearch.p.rapidapi.com/search"
                    + "?query=" + encodedQuery
                    + "&page=1"
                    + "&num_pages=1"
                    + "&date_posted=all";

            System.out.println("JSEARCH URL:");
            System.out.println(url);

            HttpHeaders headers = new HttpHeaders();

            headers.set("X-RapidAPI-Key", apiKey);

            headers.set("X-RapidAPI-Host", "jsearch.p.rapidapi.com");

            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class);

            System.out.println("RAW JSEARCH RESPONSE:");
            System.out.println(response.getBody());

            return response.getBody();

        } catch (Exception e) {

            e.printStackTrace();

            return """
                    {
                      "data":[]
                    }
                    """;
        }
    }

    private String getCountryCode(String region) {
        if (region == null || region.isBlank()) {
            return "my";
        }

        String cleanedRegion = region.trim();

        // direct mapping for common abbreviations
        if (cleanedRegion.equalsIgnoreCase("USA") || cleanedRegion.equalsIgnoreCase("US")) {
            return "us";
        }
        if (cleanedRegion.equalsIgnoreCase("UK") || cleanedRegion.equalsIgnoreCase("United Kingdom")) {
            return "gb";
        }

        // dynamic lookup using Java's Locale
        for (String countryCode : java.util.Locale.getISOCountries()) {
            java.util.Locale locale = new java.util.Locale("", countryCode);
            if (locale.getDisplayCountry(java.util.Locale.ENGLISH).equalsIgnoreCase(cleanedRegion)
                    || locale.getDisplayCountry().equalsIgnoreCase(cleanedRegion)) {
                return countryCode.toLowerCase();
            }
        }

        return "my"; // default fallback if no match is found - malaysia
    }
}