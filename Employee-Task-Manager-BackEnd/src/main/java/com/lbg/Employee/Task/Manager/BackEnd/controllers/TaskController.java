package com.lbg.Employee.Task.Manager.BackEnd.controllers;

import com.lbg.Employee.Task.Manager.BackEnd.entities.Task;
import dtos.TaskDTO;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.lbg.Employee.Task.Manager.BackEnd.services.TaskService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public TaskDTO createTask(@RequestBody TaskDTO taskDTO) {
        Task task = new Task();
        task.setName(taskDTO.getName());
        task.setDescription(taskDTO.getDescription());
        Task savedTask = taskService.createTask(task);
        return new TaskDTO(savedTask.getId(), savedTask.getName(), savedTask.getDescription(), savedTask.getAssignedEmployee() != null ? savedTask.getAssignedEmployee().getId() : null);
    }

    @GetMapping
    public List<TaskDTO> getAllTasks() {
        return taskService.getAllTasks().stream()
                .map(t -> new TaskDTO(t.getId(), t.getName(), t.getDescription(), t.getAssignedEmployee() != null ? t.getAssignedEmployee().getId() : null))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        return ResponseEntity.ok(new TaskDTO(task.getId(), task.getName(), task.getDescription(), task.getAssignedEmployee() != null ? task.getAssignedEmployee().getId() : null));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO) {
        Task updatedTask = taskService.updateTask(id, new Task(taskDTO.getId(), taskDTO.getName(), taskDTO.getDescription(), null));
        return ResponseEntity.ok(new TaskDTO(updatedTask.getId(), updatedTask.getName(), updatedTask.getDescription(), updatedTask.getAssignedEmployee() != null ? updatedTask.getAssignedEmployee().getId() : null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{taskId}/assign")
    public ResponseEntity<TaskDTO> assignTask(@PathVariable Long taskId, @RequestParam Long employeeId) {
        Task assignedTask = taskService.assignTask(taskId, employeeId);
        return ResponseEntity.ok(new TaskDTO(assignedTask.getId(), assignedTask.getName(), assignedTask.getDescription(), assignedTask.getAssignedEmployee().getId()));
    }
}