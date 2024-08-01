package services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repos.TaskRepo;
import entities.Task;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepo;

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
}
