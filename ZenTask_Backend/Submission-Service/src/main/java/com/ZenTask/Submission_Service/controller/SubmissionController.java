package com.ZenTask.Submission_Service.controller;

import com.ZenTask.Submission_Service.model.Submission;
import com.ZenTask.Submission_Service.model.SubmissionDTO;
import com.ZenTask.Submission_Service.model.UserDTO;
import com.ZenTask.Submission_Service.service.SubmissionService;
import com.ZenTask.Submission_Service.service.TaskService;
import com.ZenTask.Submission_Service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private UserService userService;

    @PostMapping("/submit")
    public ResponseEntity<Submission>submitTask(
            @RequestBody SubmissionDTO submissionDTO
            )throws Exception{


        Submission submission= submissionService.submitTask(submissionDTO.getTaskId(),submissionDTO.getGithubLink(),submissionDTO.getUserId());
        return new ResponseEntity<>(submission, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Submission> getSubmissionById(
            @PathVariable Long id
    )throws Exception{
        Submission submission = submissionService.getSubmissionById(id);
        return new ResponseEntity<>(submission,HttpStatus.OK);
    }
//    @GetMapping("/all")
//    public ResponseEntity<List<Submission>> getAllSubmissions(
//    )throws Exception{
//        List<Submission> submissions = submissionService.getAllTaskSubmissions();
//        return new ResponseEntity<>(submissions,HttpStatus.OK);
//    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<Submission>> getTaskSubmissionsByTaskId(
            @PathVariable Long taskId
    )throws Exception{
        List<Submission> submissions = submissionService.getTaskSubmissionByTaskId(taskId);
        return new ResponseEntity<>(submissions,HttpStatus.OK);
    }


    @PutMapping("review/{id}")
    public ResponseEntity<Submission> acceptDeclineSubmission(
            @PathVariable Long id,
            @RequestParam String status
    )throws Exception{
        Submission submission = submissionService.acceptDeclineSubmission(id,status);
        return new ResponseEntity<>(submission,HttpStatus.OK);
    }




}
