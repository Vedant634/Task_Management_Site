package com.ZenTask.Submission_Service.service;

import com.ZenTask.Submission_Service.model.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name="USER-SERVICE", url="http://localhost:5001")
public interface UserService {
    @GetMapping("/api/user/profile")
    UserDTO getUserProfile(@RequestHeader("Authorization") String authHeader);
}

