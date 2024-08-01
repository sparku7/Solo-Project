package dtos;

import java.util.List;

public class EmployeeDTO {
    private Long id;
    private String name;
    private String position;
    private List<TaskDTO> tasks;

    public EmployeeDTO() {}

    public EmployeeDTO(Long id, String name, String position, List<TaskDTO> tasks) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.tasks = tasks;
    }

    public EmployeeDTO(Long id, String name, String position) {
        this.id = id;
        this.name = name;
        this.position = position;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public List<TaskDTO> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskDTO> tasks) {
        this.tasks = tasks;
    }
}
