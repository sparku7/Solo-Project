import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const EmployeeCard = ({ employee }) => {
    return (
        <Card>
            <h3>{employee.name}</h3>
            <p>{employee.position}</p>
            <Link to={`/employee/${employee.id}`}>View Tasks</Link>
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
    flex: 1;
    max-width: calc(33% - 20px);
    box-sizing: border-box;
    a {
        color: #1e90ff;
        text-decoration: none;
    }
`;

export default EmployeeCard;
