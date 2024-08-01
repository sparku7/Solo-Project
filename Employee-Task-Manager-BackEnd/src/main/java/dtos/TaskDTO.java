package dtos;

public class TaskDTO {
    private Long id;
    private String name;
    private String description;
    private Long assignedEmployeeId;  // Only include employee ID

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getAssignedEmployeeId() {
        return assignedEmployeeId;
    }

    public void setAssignedEmployeeId(Long assignedEmployeeId) {
        this.assignedEmployeeId = assignedEmployeeId;
    }

    public TaskDTO(Long id, String name, String description, Long assignedEmployeeId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.assignedEmployeeId = assignedEmployeeId;


    }
}

