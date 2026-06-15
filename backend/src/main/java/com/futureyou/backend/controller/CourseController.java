package com.futureyou.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.futureyou.backend.dto.CourseRequest;
import com.futureyou.backend.dto.CourseResponse;
import com.futureyou.backend.service.CourseService;

@RestController
@RequestMapping("/courses")
@CrossOrigin
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public CourseResponse getCourses(@RequestBody CourseRequest request) {
        return courseService.getCourses(request.getCareer());
    }
}