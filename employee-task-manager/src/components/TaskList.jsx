import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard'; // Ensure this is correctly imported
import TaskForm from '../components/TaskForm'; // Ensure this is correctly imported
import styled from 'styled-components';

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchTasks();
        fetchEmployees();
    }, []);

    // Fetch tasks from the server
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/tasks');
            setTasks(response.data || []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Fetch employees from the server
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/employees');
            setEmployees(response.data || []);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    // Handle adding a new task
    const handleTaskAdded = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    // Handle assigning a task to an employee
    const handleTaskAssign = async (updatedTask) => {
        try {
            // Update the task assignment on the server
            const response = await axios.patch(
                `http://localhost:8081/api/tasks/${updatedTask.id}/assign`,
                null, // Assuming the server expects `null` or an empty body
                { params: { employeeId: updatedTask.assignedEmployeeId } }
            );

            // Update the task list state with the updated task
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === updatedTask.id
                        ? { ...task, assignedEmployee: response.data.assignedEmployee }
                        : task
                )
            );
        } catch (error) {
            console.error('Error assigning task:', error);
        }
    };

    // Handle deleting a task
    const handleTaskDelete = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8081/api/tasks/${taskId}`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <Container>
            <h1>Tasks</h1>
            <TaskForm onTaskAdded={handleTaskAdded} />
            <TaskGrid>
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        employees={employees}
                        onDelete={handleTaskDelete}
                        onAssign={handleTaskAssign}
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

export default TaskListPage;
