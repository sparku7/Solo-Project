import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const TaskCard = ({ task, onDelete, onAssign, employees }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/tasks/${task.id}`);
            onDelete(task.id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleAssign = async (e) => {
        try {
            const employeeId = e.target.value;
            await axios.patch(`http://localhost:8081/api/tasks/${task.id}`, { assignedEmployee: employeeId });
            onAssign(task.id, employeeId);
        } catch (error) {
            console.error('Error assigning task:', error);
        }
    };

    return (
        <Card>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>Assigned to: {task.assignedEmployee ? task.assignedEmployee.name : 'None'}</p>
            <button onClick={handleDelete}>Delete</button>
            <select onChange={handleAssign} defaultValue="">
                <option value="">Assign to...</option>
                {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
            </select>
        </Card>
    );
};

const Card = styled.div`
    background: #444;
    color: white;
    padding: 20px;
    border-radius: 8px;
    margin: 10px;
    text-align: center;
    flex: 1 1 calc(33.333% - 20px);
    box-sizing: border-box;
`;

export default TaskCard;
