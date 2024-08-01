import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import styled from 'styled-components';
import axios from 'axios';

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    return (
        <Container>
            <h1>All Tasks</h1>
            <TaskList tasks={tasks} />
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    margin-top: 60px;
`;

export default TaskListPage;
