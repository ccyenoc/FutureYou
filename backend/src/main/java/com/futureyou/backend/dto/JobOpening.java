package com.futureyou.backend.dto;

public class JobOpening {

    private String title;

    private String company;

    private String location;

    private String type;


    private String url;

    public JobOpening() {
    }

    public JobOpening(
        String title,
        String company,
        String location,
        String type,
        String url
    ) {
        this.title = title;
        this.company = company;
        this.location = location;
        this.type = type;
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}