package com.ZenTask.Submission_Service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {
    private Long id ;

    private String title;

    private String description;

    private String image;

    private Long assignedUserId;

    private List<String> tags = new ArrayList<>();

    private TaskStatus status;

    private LocalDateTime deadline;

    private LocalDateTime createdAt;
}
