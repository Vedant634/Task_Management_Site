package com.ZenTask.Submission_Service.repository;

import com.ZenTask.Submission_Service.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission,Long> {
    List<Submission> findByTaskId(Long taskId);
}
