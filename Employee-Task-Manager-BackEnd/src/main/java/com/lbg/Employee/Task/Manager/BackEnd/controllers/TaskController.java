package com.lbg.Employee.Task.Manager.BackEnd.controllers;

import com.lbg.Employee.Task.Manager.BackEnd.entities.Task;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.lbg.Employee.Task.Manager.BackEnd.services.TaskService;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        return ResponseEntity.ok().body(task);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task updatedTask = taskService.updateTask(id, taskDetails);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();    }

    @PatchMapping("/{taskId}/assign")
    public ResponseEntity<Task> assignTask(
            @PathVariable Long taskId,
            @RequestParam Long employeeId) {
        Task updatedTask = taskService.assignTask(taskId, employeeId);
        return ResponseEntity.ok(updatedTask);
    }
}
