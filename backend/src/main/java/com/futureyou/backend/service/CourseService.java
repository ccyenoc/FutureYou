package com.futureyou.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.futureyou.backend.dto.CourseRecommendation;
import com.futureyou.backend.dto.CourseResponse;

@Service
public class CourseService {

    private final TavilyService tavilyService;

    public CourseService(TavilyService tavilyService) {
        this.tavilyService = tavilyService;
    }

    public CourseResponse getCourses(String career) {

        try {

            String cleanCareer = career
                    .replaceAll("\\(.*?\\)", "")
                    .replaceAll("(?i)\\b(Senior|Junior|Staff|Lead|Principal|Associate|Entry-Level)\\b", "")
                    .replaceAll("\\s+", " ")
                    .trim();

            String query = String.format(
                    "(site:coursera.org/learn OR site:udemy.com/course OR site:edx.org/learn) %s",
                    cleanCareer);

            String result = tavilyService.search(query);

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root = mapper.readTree(result);

            JsonNode results = root.path("results");

            List<CourseRecommendation> courses = new ArrayList<>();

            if (results.isArray()) {

                for (int i = 0; i < Math.min(results.size(), 5); i++) {

                    JsonNode item = results.get(i);

                    CourseRecommendation course = new CourseRecommendation();

                    course.setTitle(item.path("title").asText());

                    course.setDescription(item.path("content").asText());

                    course.setUrl(item.path("url").asText());

                    course.setProvider("Online Course");

                    courses.add(course);
                }
            }

            return new CourseResponse(courses);

        } catch (Exception e) {
            e.printStackTrace();

            return new CourseResponse(new ArrayList<>());
        }
    }
}