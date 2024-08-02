import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import styled from 'styled-components';

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchTasks();
        fetchEmployees();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/tasks');
            setTasks(response.data || []); // Ensure tasks is always an array
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/employees');
            setEmployees(response.data || []); // Ensure employees is always an array
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleTaskAdded = async (newTask) => {
        if (!newTask) {
            console.error('Invalid task:', newTask);
            return;
        }

        try {
            // Optionally, you can make a request to fetch the updated task list
            // Or just add the new task directly to the state
            setTasks(prevTasks => [...prevTasks, newTask]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleTaskDelete = (id) => {
        if (id) {
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } else {
            console.error('Invalid task id for deletion:', id);
        }
    };

    const handleTaskAssign = (updatedTask) => {
        if (updatedTask && updatedTask.id) {
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === updatedTask.id
                        ? { ...task, assignedEmployeeId: updatedTask.assignedEmployeeId }
                        : task
                )
            );
        } else {
            console.error('Invalid updated task:', updatedTask);
        }
    };

    return (
        <Container>
            <h1>Tasks</h1>
            <TaskForm onTaskAdded={handleTaskAdded} />
            <TaskGrid>
                {tasks && tasks.length > 0 ? (
                    tasks.map(task => (
                        task && task.id ? (
                            <TaskCard
                                key={task.id}
                                task={task}
                                employees={employees}
                                onDelete={handleTaskDelete}
                                onAssign={handleTaskAssign}
                            />
                        ) : (
                            <p key="error">Error: Task data is missing.</p>
                        )
                    ))
                ) : (
                    <p>No tasks available</p>
                )}
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
