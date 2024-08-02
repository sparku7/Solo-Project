import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const EmployeeForm = ({ onEmployeeAdded }) => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/employees', {
                name,
                position,
            });
            onEmployeeAdded(response.data);
            setName('');
            setPosition('');
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <FormContainer>
            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Employee Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
                <Button type="submit">Add Employee</Button>
            </form>
        </FormContainer>
    );
};

const FormContainer = styled.div`
    background: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    display: block;
    margin: 10px 0;
    padding: 10px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

const Button = styled.button`
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
    margin-top: 10px;
`;

export default EmployeeForm;
