package com.futureyou.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.futureyou.backend.entity.Interview;

public interface InterviewRepository extends JpaRepository<Interview, Long> {

    List<Interview> findByUserId( Long userId );

}