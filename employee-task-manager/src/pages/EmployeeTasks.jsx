import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskList from '../components/TaskList';
import styled from 'styled-components';
import axios from 'axios';

const EmployeeTasks = () => {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get(`/api/employees/${id}/tasks`)
            .then(response => setTasks(response.data.tasks))
            .catch(error => console.error('Error fetching tasks:', error));
    }, [id]);

    return (
        <Container>
            <h1>Tasks for Employee ID: {id}</h1>
            <TaskList tasks={tasks} />
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    margin-top: 60px;
`;

export default EmployeeTasks;
