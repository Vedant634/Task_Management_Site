package com.ZenTask.Submission_Service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubmissionDTO {
    private Long taskId;
    private String githubLink;
    private Long userId;
}
