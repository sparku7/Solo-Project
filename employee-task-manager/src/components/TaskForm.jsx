import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const TaskForm = ({ onTaskAdded }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8081/api/tasks', {
                name: taskName,
                description: taskDescription,
            });
            setTaskName('');
            setTaskDescription('');
            onTaskAdded(); // Notify parent to refresh task list
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task Name"
                required
            />
            <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Task Description"
                required
            />
            <button type="submit">Add Task</button>
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    input, textarea {
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }
    button {
        background: #1e90ff;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px;
        cursor: pointer;
    }
`;

export default TaskForm;
