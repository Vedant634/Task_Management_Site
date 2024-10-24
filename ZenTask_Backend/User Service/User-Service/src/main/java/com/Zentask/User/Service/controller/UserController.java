package com.Zentask.User.Service.controller;

import com.Zentask.User.Service.config.JwtUtils;
import com.Zentask.User.Service.dto.UserDTO;
import com.Zentask.User.Service.model.User;
import com.Zentask.User.Service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getUserProfile(@RequestHeader("Authorization") String authHeader){
        String Jwt  =authHeader.substring(7).trim();
        String email = jwtUtils.extractUserName(Jwt);
        UserDTO userDTO = userService.getUserProfile(email);
        return ResponseEntity.status(200).body(userDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getUserList(){
        List<UserDTO> users = userService.getUserList();
        System.out.println(users);
        return ResponseEntity.status(200).body(users);
    }
}
