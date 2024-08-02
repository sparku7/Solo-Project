import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const { employeeId } = useParams(); // Get employeeId from URL

    useEffect(() => {
        fetchTasks();
        fetchEmployees();
    }, []);

    useEffect(() => {
        // Fetch tasks again if employeeId changes
        if (employeeId) {
            fetchTasks();
        }
    }, [employeeId]);

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
        console.log('Updating task:', updatedTask); // Log updated task
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === updatedTask.id ? { ...task, assignedEmployeeId: updatedTask.assignedEmployeeId } : task
            )
        );
    };
    
    

    const filteredTasks = employeeId 
    ? tasks.filter(task => task.assignedEmployeeId === parseInt(employeeId, 10)) 
    : tasks;


    return (
        <Container>
            <h1>Tasks</h1>
            <TaskForm onTaskAdded={handleTaskAdded} />
            <TaskGrid>
                {filteredTasks.map(task => (
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
