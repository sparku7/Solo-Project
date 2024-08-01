package com.lbg.Employee.Task.Manager.BackEnd.controllers;

import com.lbg.Employee.Task.Manager.BackEnd.entities.Employee;
import dtos.EmployeeDTO;
import dtos.TaskDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.lbg.Employee.Task.Manager.BackEnd.services.EmployeeService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        employee.setName(employeeDTO.getName());
        employee.setPosition(employeeDTO.getPosition());
        Employee savedEmployee = employeeService.createEmployee(employee);
        return ResponseEntity.ok(new EmployeeDTO(savedEmployee.getId(), savedEmployee.getName(), savedEmployee.getPosition()));
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<EmployeeDTO> employeesDTO = employeeService.getAllEmployees().stream()
                .map(e -> new EmployeeDTO(e.getId(), e.getName(), e.getPosition(),
                        e.getTasks().stream()
                                .map(t -> new TaskDTO(t.getId(), t.getName(), t.getDescription(), t.getAssignedEmployee() != null ? t.getAssignedEmployee().getId() : null))
                                .collect(Collectors.toList())))
                .collect(Collectors.toList());
        return ResponseEntity.ok(employeesDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        EmployeeDTO employeeDTO = new EmployeeDTO(
                employee.getId(),
                employee.getName(),
                employee.getPosition(),
                employee.getTasks().stream()
                        .map(t -> new TaskDTO(t.getId(), t.getName(), t.getDescription(), t.getAssignedEmployee() != null ? t.getAssignedEmployee().getId() : null))
                        .collect(Collectors.toList())
        );
        return ResponseEntity.ok(employeeDTO);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDTO employeeDTO) {
        Employee employeeToUpdate = new Employee();
        employeeToUpdate.setId(id);
        employeeToUpdate.setName(employeeDTO.getName());
        employeeToUpdate.setPosition(employeeDTO.getPosition());
        Employee updatedEmployee = employeeService.updateEmployee(id, employeeToUpdate);
        EmployeeDTO updatedEmployeeDTO = new EmployeeDTO(
                updatedEmployee.getId(),
                updatedEmployee.getName(),
                updatedEmployee.getPosition(),
                updatedEmployee.getTasks().stream()
                        .map(t -> new TaskDTO(t.getId(), t.getName(), t.getDescription(), t.getAssignedEmployee() != null ? t.getAssignedEmployee().getId() : null))
                        .collect(Collectors.toList())
        );
        return ResponseEntity.ok(updatedEmployeeDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
