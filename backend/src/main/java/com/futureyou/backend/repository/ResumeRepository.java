package com.futureyou.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.futureyou.backend.entity.Resume;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    List<Resume> findByUserId( Long userId );

}