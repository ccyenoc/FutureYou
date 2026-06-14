package com.futureyou.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseMigrationRunner implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseMigrationRunner(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            // Alter columns to TEXT to support longer generated texts
            jdbcTemplate.execute("ALTER TABLE question_reviews ALTER COLUMN question TYPE TEXT");
            jdbcTemplate.execute("ALTER TABLE question_reviews ALTER COLUMN answer TYPE TEXT");
            jdbcTemplate.execute("ALTER TABLE question_reviews ALTER COLUMN feedback TYPE TEXT");
            jdbcTemplate.execute("ALTER TABLE question_reviews ALTER COLUMN suggested_answer TYPE TEXT");
            
            // Also ensure resumes.extracted_text is TEXT
            jdbcTemplate.execute("ALTER TABLE resumes ALTER COLUMN extracted_text TYPE TEXT");
            
            // Also ensure users.profile_picture_url is TEXT
            jdbcTemplate.execute("ALTER TABLE users ALTER COLUMN profile_picture_url TYPE TEXT");
            
            System.out.println("Database migration successfully updated column types to TEXT.");
        } catch (Exception e) {
            System.err.println("Database migration run/check completed: " + e.getMessage());
        }
    }
}
