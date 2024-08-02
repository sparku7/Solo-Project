import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const TaskCard = React.memo(({ task, employees, onDelete, onAssign }) => {
    console.log('TaskCard props:', { task, employees });

    if (!task || !task.id) {
        return <div>Error: Task data is missing.</div>;
    }

    if (employees.length === 0) {
        console.warn('No employees available');
    }

    const handleDelete = async () => {
        try {
            console.log(`Deleting task with ID: ${task.id}`);
            await axios.delete(`http://localhost:8081/api/tasks/${task.id}`);
            onDelete(task.id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleAssign = async (e) => {
        e.preventDefault(); // Prevent default browser behavior if necessary
        const employeeId = e.target.value;
        if (!employeeId) return; // Skip if no employee selected

        console.log(`Assigning task ID ${task.id} to employee ID ${employeeId}`);

        try {
            const response = await axios.patch(
                `http://localhost:8081/api/tasks/${task.id}/assign`,
                null,
                { params: { employeeId } }
            );
            console.log('Task assigned response:', response.data);
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
                {employees.length > 0 ? (
                    employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))
                ) : (
                    <option value="">No employees available</option>
                )}
            </select>
        </Card>
    );
});

// Styled components
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
