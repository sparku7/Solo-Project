import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm'; // Assuming TaskForm is the component to add a new task

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);

    // Fetch tasks and employees when the component mounts
    useEffect(() => {
        fetchTasks();
        fetchEmployees();
    }, []);

    // Fetch tasks from the server
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Fetch employees from the server
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    // Handle task deletion
    const handleDelete = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    // Handle task assignment
    const handleAssign = (taskId, employeeId) => {
        setTasks(prevTasks => prevTasks.map(task => 
            task.id === taskId ? { ...task, assignedEmployee: employees.find(emp => emp.id === employeeId) } : task
        ));
    };

    // Handle adding a new task
    const handleAddTask = () => {
        fetchTasks(); // Refresh the list of tasks
    };

    return (
        <Container>
            <h1>Tasks</h1>
            <TaskForm onTaskAdded={handleAddTask} />
            <TaskGrid>
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDelete={handleDelete}
                        onAssign={handleAssign}
                        employees={employees} // Pass employees for assignment
                    />
                ))}
            </TaskGrid>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    margin-top: 60px;
`;

const TaskGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

export default TaskList;
