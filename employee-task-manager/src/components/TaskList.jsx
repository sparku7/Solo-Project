import React from 'react';
import styled from 'styled-components';

const TaskList = ({ tasks }) => {
    return (
        <TaskContainer>
            {tasks.map(task => (
                <TaskCard key={task.id}>
                    <h4>{task.name}</h4>
                    <p>{task.description}</p>
                </TaskCard>
            ))}
        </TaskContainer>
    );
};

const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TaskCard = styled.div`
    background: #555;
    color: white;
    padding: 15px;
    border-radius: 8px;
`;

export default TaskList;
