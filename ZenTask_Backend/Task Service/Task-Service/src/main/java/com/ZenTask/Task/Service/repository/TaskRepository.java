package com.ZenTask.Task.Service.repository;

import com.ZenTask.Task.Service.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findByAssignedUserId(Long userId);
}
