package com.futureyou.backend.dto;

public class TavilyRequest {

    private String query;

    private String api_key;

    private int max_results;

    public TavilyRequest() {}

    public TavilyRequest(
        String query,
        String api_key,
        int max_results
    ) {
        this.query = query;
        this.api_key = api_key;
        this.max_results = max_results;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getApi_key() {
        return api_key;
    }

    public void setApi_key(String api_key) {
        this.api_key = api_key;
    }

    public int getMax_results() {
        return max_results;
    }

    public void setMax_results(int max_results) {
        this.max_results = max_results;
    }
}