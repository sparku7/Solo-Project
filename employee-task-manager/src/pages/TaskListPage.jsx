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
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleTaskAdded = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const handleTaskDelete = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const handleTaskAssign = (updatedTask) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === updatedTask.id ? { ...task, assignedEmployeeId: updatedTask.assignedEmployeeId } : task
            )
        );
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
