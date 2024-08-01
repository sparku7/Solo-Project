package com.lbg.Employee.Task.Manager.BackEnd.services;

import com.lbg.Employee.Task.Manager.BackEnd.entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lbg.Employee.Task.Manager.BackEnd.repos.TaskRepo;
import com.lbg.Employee.Task.Manager.BackEnd.entities.Task;
import com.lbg.Employee.Task.Manager.BackEnd.repos.EmployeeRepo;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepo;
    @Autowired
    private EmployeeRepo employeeRepo;

    // Create new task
    public Task createTask(Task task) {
        return taskRepo.save(task);
    }

    // Get all tasks
    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    // Get task by ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepo.findById(id);
    }

    // Update task details
    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepo.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setName(taskDetails.getName());
        task.setDescription(taskDetails.getDescription());
        task.setAssignedEmployee(taskDetails.getAssignedEmployee());
        return taskRepo.save(task);
    }

    // Delete task
    public void deleteTask(Long id) {
        Task task = taskRepo.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepo.delete(task);
    }

    public Task assignTask(Long taskId, Long employeeId) {
        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        Employee employee = employeeRepo.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        task.setAssignedEmployee(employee);
        return taskRepo.save(task);
    }
}
