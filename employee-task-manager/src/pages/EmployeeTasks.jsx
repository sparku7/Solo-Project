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

    useEffect(() => {
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

        fetchTasksAndEmployees();
    }, [id]);

    const handleDelete = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleAssign = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
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
                    <p>No tasks found.</p>
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

export default EmployeeTasks;