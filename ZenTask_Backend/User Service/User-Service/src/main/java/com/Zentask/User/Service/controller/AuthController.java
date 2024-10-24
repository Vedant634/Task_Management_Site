package com.Zentask.User.Service.controller;

import com.Zentask.User.Service.dto.LoginRequest;
import com.Zentask.User.Service.model.User;
import com.Zentask.User.Service.responses.AuthResponse;
import com.Zentask.User.Service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody User user){
        AuthResponse response = userService.register(user);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest){
        AuthResponse response = userService.login(loginRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }



}
