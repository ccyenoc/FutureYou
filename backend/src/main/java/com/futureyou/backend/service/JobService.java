package com.futureyou.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.futureyou.backend.dto.JobOpening;
import com.futureyou.backend.dto.JobsResponse;

@Service
public class JobService {

    private final JSearchService jSearchService;

    public JobService(
        JSearchService jSearchService
    ) {
        this.jSearchService = jSearchService;
    }

    public JobsResponse getJobs(
        String career,
        String jobType,
        String region
    ) {

        try {

            System.out.println(
                "Searching jobs for: "
                + career
                + " | "
                + jobType
                + " | "
                + region
            );

            String response =
                jSearchService.searchJobs(
                    career,
                    jobType,
                    region
                );

            System.out.println(
                "JSearch Response:\n"
                + response
            );

            ObjectMapper mapper =
                new ObjectMapper();

            JsonNode root =
                mapper.readTree(response);

            JsonNode jobsNode =
            root.path("data")
                .path("jobs");

            List<JobOpening> jobs =
                new ArrayList<>();

            if (jobsNode.isArray()) {

                 for (JsonNode job : jobsNode) {

                    String title =
                        job.path("job_title")
                            .asText();

                    String company =
                        job.path("employer_name")
                            .asText("Unknown");

                    String location =
                        job.path("job_city")
                            .asText(region);

                    String type =
                        job.path("job_employment_type")
                            .asText(jobType);

                    String url =
                        job.path("job_apply_link")
                            .asText();

                    jobs.add(
                        new JobOpening(
                            title,
                            company,
                            location,
                            type,
                            url
                        )
                    );
                }
            }

            System.out.println(
                "Jobs Found = "
                + jobs.size()
            );

            return new JobsResponse(
                jobs
            );

        }
        catch (Exception e) {

            e.printStackTrace();

            return new JobsResponse(
                new ArrayList<>()
            );
        }
    }
}