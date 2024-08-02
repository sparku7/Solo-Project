package com.lbg.Employee.Task.Manager.BackEnd.repos;

import com.lbg.Employee.Task.Manager.BackEnd.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {

    List<Employee> findByNameStartingWithIgnoreCase(String query);
}
