package com.futureyou.backend.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service

public class GeminiService{

    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.create();

    public String generate(String prompt){
        try{
            System.out.println("Gemini Key = [" + apiKey + "]");
        String url =  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="+ apiKey;

        Map<String, Object> body = 
        Map.of("contents", new Object[]{
            Map.of("parts", new Object[] {
                Map.of("text",prompt)
            })
        });

        Map response =
webClient
    .post()
    .uri(url)
    .contentType(MediaType.APPLICATION_JSON)
    .bodyValue(body)
    .retrieve()
    .onStatus(
        status -> status.isError(),
        clientResponse ->
            clientResponse
                .bodyToMono(String.class)
                .flatMap(errorBody -> {

                    System.out.println(
                        "Gemini Error Body:\n"
                        + errorBody
                    );

                    return reactor.core.publisher.Mono.error(
                        new RuntimeException(errorBody)
                    );
                })
    )
    .bodyToMono(Map.class)
    .block();

        if(response == null || response.get("candidates")==null){
            return """
            Career Echo is busy  👻

            Please try again later.
            """;
        }

        Map candidate = (Map)
        ((java.util.List)
        response.get("candidates"))
        .get(0);

        Map content =
        (Map)
        candidate.get("content");

        Map part =(Map) ((java.util.List)content.get("parts")).get(0);

        return part.get("text").toString();
        }
        catch(Exception err){
            throw new RuntimeException(
                "Gemini request failed",
                err
            );
        }
}
}