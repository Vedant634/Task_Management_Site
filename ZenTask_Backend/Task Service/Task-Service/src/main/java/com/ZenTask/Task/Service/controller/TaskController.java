package com.ZenTask.Task.Service.controller;

import com.ZenTask.Task.Service.model.Task;
import com.ZenTask.Task.Service.model.TaskStatus;
import com.ZenTask.Task.Service.model.UserDTO;
import com.ZenTask.Task.Service.service.TaskService;
import com.ZenTask.Task.Service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Task> createTask(@RequestBody Task task, @RequestHeader("Authorization") String authHeader)throws Exception{
        UserDTO userDTO = userService.getUserProfile(authHeader);
        String requesterRole = userDTO.getRole();
        Task createdTask = taskService.createTask(task,requesterRole);
        return ResponseEntity.status(200).body(createdTask);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id)throws Exception{
        Task createdTask = taskService.getTaskById(id);
        return ResponseEntity.status(200).body(createdTask);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Task>> getAssignedUsersTask(@RequestParam(required = false) TaskStatus status,@RequestHeader("Authorization") String authHeader )throws Exception{
        UserDTO userDTO = userService.getUserProfile(authHeader);
        Long userid = userDTO.getId();
        List<Task>tasks = taskService.assignedUserTask(userid,status);
        return ResponseEntity.status(200).body(tasks);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Task>> getAllTask(@RequestParam(required = false) TaskStatus status )throws Exception{
        List<Task>tasks = taskService.getAllTasks(status);
        return ResponseEntity.status(200).body(tasks);
    }

    @PutMapping("/{id}/user/{userId}/assigned")
    public ResponseEntity<Task> assignedTaskToUser(@PathVariable Long id,@PathVariable Long userId )throws Exception{

        Task task = taskService.assignedToUser(userId,id);
        return ResponseEntity.status(200).body(task);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Task> updateTask(@RequestBody Task updateTask, @PathVariable Long id)throws Exception{
        Task updatedTask = taskService.updateTask(id,updateTask);
        return ResponseEntity.status(200).body(updatedTask);
    }

    @PutMapping("/complete/{id}")
    public ResponseEntity<Task> completeTask(@PathVariable Long id)throws Exception{
        Task completedTask = taskService.completeTask(id);
        return ResponseEntity.status(200).body(completedTask);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id)throws Exception{
        taskService.deleteById(id);
        return ResponseEntity.status(204).build();
    }

}
