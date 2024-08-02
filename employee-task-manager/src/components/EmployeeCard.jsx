import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const EmployeeCard = ({ employee, onDelete }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/employees/${employee.id}`);
            onDelete(employee.id);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error('Employee not found:', error.response.data);
            } else {
                console.error('Error deleting employee:', error.response ? error.response.data : error.message);
            }
        }
    };

    return (
        <Card>
            <h3>{employee.name}</h3>
            <p>{employee.position}</p>
            <Link to={`/employee/${employee.id}`}>View Tasks</Link>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
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
    a {
        color: #1e90ff;
        text-decoration: none;
    }
`;

const DeleteButton = styled.button`
    background: #ff4d4f;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
    margin-top: 10px;
`;

export default EmployeeCard;
