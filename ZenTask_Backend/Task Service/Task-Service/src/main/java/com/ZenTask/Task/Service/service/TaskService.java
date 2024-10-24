package com.ZenTask.Task.Service.service;

import com.ZenTask.Task.Service.exception.OurException;
import com.ZenTask.Task.Service.model.Task;
import com.ZenTask.Task.Service.model.TaskStatus;
import com.ZenTask.Task.Service.model.UserDTO;
import com.ZenTask.Task.Service.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    public Task createTask(Task task, String requesterRole) throws Exception {


        if (!requesterRole.equals("ROLE_ADMIN")) {
            throw new OurException("only admin can create tasks");
        }
        task.setStatus(TaskStatus.PENDING);
        task.setCreatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    public Task getTaskById(Long Id) throws Exception {
        return taskRepository.findById(Id).orElseThrow(() -> new OurException("Task Not Found"));
    }

    public List<Task> getAllTasks(TaskStatus status) throws Exception {
        List<Task> allTasks = taskRepository.findAll();
        List<Task> filteredTasks = allTasks.stream().filter(
                task -> status == null || task.getStatus().name().equalsIgnoreCase(status.toString())
        ).collect(Collectors.toList());

        return filteredTasks;
    }

    public Task updateTask(Long id,Task updatedTask) throws Exception{
        Task existingTask = taskRepository.findById(id).orElseThrow(() -> new OurException("Task Not Found"));

        if (updatedTask.getTitle() != null) {
            existingTask.setTitle(updatedTask.getTitle());
        }
        if (updatedTask.getDescription() != null) {
            existingTask.setDescription(updatedTask.getDescription());
        }
        if (updatedTask.getImage() != null) {
            existingTask.setImage(updatedTask.getImage());
        }
        if (updatedTask.getTags() != null && !updatedTask.getTags().isEmpty()) {
            existingTask.setTags(updatedTask.getTags());
        }
        if (updatedTask.getStatus() != null) {
            existingTask.setStatus(updatedTask.getStatus());
        }
        if (updatedTask.getDeadline() != null) {
            existingTask.setDeadline(updatedTask.getDeadline());
        }
        return taskRepository.save(existingTask);

    }

    public  void deleteById(Long Id){
        taskRepository.deleteById(Id);
    }

    public Task assignedToUser(Long userId,Long taskId){
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new OurException("Task Not Found"));
        task.setAssignedUserId(userId);
        task.setStatus(TaskStatus.ASSIGNED);

        return taskRepository.save(task);
    }

    public List<Task> assignedUserTask(Long userId,TaskStatus status) throws Exception {

        List<Task> allTasks = taskRepository.findByAssignedUserId(userId);
        List<Task> filteredTasks = allTasks.stream().filter(
                task -> status == null || task.getStatus().name().equalsIgnoreCase(status.toString())
        ).collect(Collectors.toList());

        return filteredTasks;
    }

    public Task completeTask(Long taskId){
        Task task= taskRepository.findById(taskId).orElseThrow(() -> new OurException("Task Not Found"));
        task.setStatus(TaskStatus.DONE);
        return taskRepository.save(task);
    }
}
