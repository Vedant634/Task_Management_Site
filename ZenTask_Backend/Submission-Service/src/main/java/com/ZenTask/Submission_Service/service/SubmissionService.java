package com.ZenTask.Submission_Service.service;

import com.ZenTask.Submission_Service.exception.OurException;
import com.ZenTask.Submission_Service.model.Submission;
import com.ZenTask.Submission_Service.model.TaskDTO;
import com.ZenTask.Submission_Service.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubmissionService {
    @Autowired
    TaskService taskService;

    @Autowired
    private SubmissionRepository submissionRepository;

    public Submission submitTask(Long taskId,String githubLink,Long userId) throws Exception{
        TaskDTO taskDTO  = taskService.getTaskById(taskId);
        if(taskDTO!=null){
            Submission submission =new Submission();
            submission.setSubmissionTime(LocalDateTime.now());
            submission.setTaskId(taskId);
            submission.setGithubLink(githubLink);
            submission.setUserId(userId);
            return submissionRepository.save(submission);
        }
        throw new OurException("Task Not found ");
    }

    public Submission getSubmissionById(Long submissionId) throws Exception{
        return submissionRepository.findById(submissionId).orElseThrow(()->new OurException("No task submission found for this id "+submissionId));
    }

    public List<Submission> getAllTaskSubmissions(){
        return submissionRepository.findAll();
    }

    public List<Submission> getTaskSubmissionByTaskId(Long taskId){
        return submissionRepository.findByTaskId(taskId);
    }

    public Submission acceptDeclineSubmission(Long id,String status)throws Exception{
        Submission submission = submissionRepository.findById(id).orElseThrow(()->new OurException("No task submission found for this id "+id));
        submission.setStatus(status);
        System.out.println(status);
        if(status.equals("ACCEPT")){
            taskService.completeTask(submission.getTaskId());
        }
        return submissionRepository.save(submission);
    }

}
