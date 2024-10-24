package com.ZenTask.Submission_Service.service;

import com.ZenTask.Submission_Service.model.TaskDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(name="TASK-SERVICE",url="http://localhost:5002")
public interface TaskService {

    @GetMapping("/api/tasks/{id}")
    public TaskDTO getTaskById(@PathVariable Long id)throws Exception;

    @PutMapping("/api/tasks/complete/{id}")
    public TaskDTO completeTask(@PathVariable Long id)throws Exception;
}
