package com.Zentask.User.Service.service;

import com.Zentask.User.Service.config.JwtUtils;
import com.Zentask.User.Service.dto.LoginRequest;
import com.Zentask.User.Service.dto.UserDTO;
import com.Zentask.User.Service.exception.OurException;
import com.Zentask.User.Service.model.User;
import com.Zentask.User.Service.repository.UserRepository;
import com.Zentask.User.Service.responses.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;



    public AuthResponse register(User user) {
        AuthResponse response = new AuthResponse();
        try{
            if(user.getRole() == null || user.getRole().isBlank()){
                user.setRole("USER");
            }
            if(userRepository.existsByEmail(user.getEmail())){
                throw new OurException(user.getEmail() + "Already Exist");
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User saveuser = userRepository.save(user);

            response.setMessage("Succesfully registered");
            response.setStatusCode(200);
            response.setJwt(jwtUtils.generateToken(user));
        }
        catch(OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }
        catch (Exception e){
            response.setStatusCode(400);
            response.setMessage("Error occurred during registration " + e.getMessage());
        }
        return response;
    }

    public AuthResponse login(LoginRequest loginRequest) {

        AuthResponse response = new AuthResponse();
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword()));

            User user =  userRepository.findByEmail(loginRequest.getEmail());
            String token = jwtUtils.generateToken(user);
            if(!authentication.isAuthenticated()){
                throw new OurException("Not Authenticated");
            }
            response.setStatusCode(200);
            response.setJwt(token);
            response.setMessage("Successful login");
        }
        catch(OurException e){
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        }
        catch (Exception e){
            response.setStatusCode(400);
            response.setMessage("Error occurred during registration " + e.getMessage());
        }
        return response;

    }

    public UserDTO getUserProfile(String email){

        User user = userRepository.findByEmail(email);

        UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getRole(),
                user.getFullName()
        );
        return userDTO;

    }

    public List<UserDTO> getUserList() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOS = new ArrayList<>();

        for (User user : users) {
            UserDTO userDTO = new UserDTO(
                    user.getId(),
                    user.getEmail(),
                    user.getRole(),
                    user.getFullName()
            );
            userDTOS.add(userDTO);
        }

        return userDTOS;
    }



}
