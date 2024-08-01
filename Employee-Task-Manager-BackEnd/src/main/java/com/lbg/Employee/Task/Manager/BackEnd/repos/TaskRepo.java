package com.lbg.Employee.Task.Manager.BackEnd.repos;

import com.lbg.Employee.Task.Manager.BackEnd.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepo extends JpaRepository<Task, Long> {}
