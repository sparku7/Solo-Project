import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const TaskCard = ({ task, onDelete, onAssign, employees }) => {
    if (!task || !task.id) {
        return <div>Error: Task data is missing.</div>;
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/tasks/${task.id}`);
            onDelete(task.id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleAssign = async (e) => {
        const employeeId = e.target.value;
        if (!employeeId) return; // Skip if no employee selected

        try {
            const response = await axios.patch(
                `http://localhost:8081/api/tasks/${task.id}/assign`,
                null,
                { params: { employeeId } }
            );

            onAssign(response.data);
        } catch (error) {
            console.error('Error assigning task:', error);
        }
    };

    const assignedEmployee = employees.find(emp => emp.id === task.assignedEmployeeId);
    const assignedEmployeeName = assignedEmployee ? assignedEmployee.name : 'None';

    return (
        <Card>
            <h3>{task.name || 'No Name'}</h3>
            <p>{task.description || 'No Description'}</p>
            <p>Assigned to: {assignedEmployeeName}</p>
            <button onClick={handleDelete}>Delete</button>
            <select onChange={handleAssign} value={task.assignedEmployeeId || ""}>
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

    button {
        background: #ff4d4f;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px;
        cursor: pointer;
        margin-top: 10px;
    }
    
    select {
        margin-top: 10px;
        padding: 5px;
        border-radius: 4px;
    }
`;

export default TaskCard;
