import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import styled from 'styled-components';

const EmployeeTasks = () => {
    const { id } = useParams(); // Extract employee ID from URL
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [employees, setEmployees] = useState([]);

    const fetchTasksAndEmployees = async () => {
        try {
            const [tasksResponse, employeesResponse] = await Promise.all([
                axios.get(`http://localhost:8081/api/tasks/employee/${id}/tasks`),
                axios.get(`http://localhost:8081/api/employees`)
            ]);
            setTasks(tasksResponse.data);
            setEmployees(employeesResponse.data);
        } catch (err) {
            console.error('Error fetching tasks and employees:', err); // Log error
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasksAndEmployees();
    }, [id]);

    const handleDelete = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleAssign = async (updatedTask) => {
        await fetchTasksAndEmployees();
    };

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>Error fetching tasks: {error}</p>;

    return (
        <div>
            <h2>Tasks for Employee {id}</h2>
            <TaskList>
                {tasks.length ? (
                    tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            employees={employees}
                            onDelete={handleDelete}
                            onAssign={handleAssign}
                        />
                    ))
                ) : (
                    <NoTasksMessage>No tasks found.</NoTasksMessage>
                )}
            </TaskList>
        </div>
    );
};

// Styled components
const TaskList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const NoTasksMessage = styled.p`
    color: #ff4d4f;
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    width: 100%;
    padding: 20px;
    background: #f0f0f0;
    border-radius: 8px;
    margin: 10px 0;
`;

export default EmployeeTasks;
