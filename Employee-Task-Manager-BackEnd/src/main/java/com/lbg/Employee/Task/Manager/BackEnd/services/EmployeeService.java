package com.lbg.Employee.Task.Manager.BackEnd.services;

import com.lbg.Employee.Task.Manager.BackEnd.entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lbg.Employee.Task.Manager.BackEnd.repos.EmployeeRepo;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    // Create new employee
    public Employee createEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }

    // Get employee by ID
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepo.findById(id);
    }

    // Update employee details
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = employeeRepo.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        employee.setName(employeeDetails.getName());
        employee.setPosition(employeeDetails.getPosition());
        return employeeRepo.save(employee);
    }

    // Delete employee
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepo.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        employeeRepo.delete(employee);
    }
}
