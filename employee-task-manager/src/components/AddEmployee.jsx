import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const EmployeeForm = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        
        try {
            const response = await axios.post('http://localhost:8081/api/employees', {
                name,
                position,
            });
            console.log('Employee created:', response.data);
            // Optionally, redirect or reset the form
        } catch (err) {
            setError('Failed to create employee.');
            console.error('Error creating employee:', err);
        }
    };

    return (
        <FormContainer>
            <h2>Add New Employee</h2>
            <Form onSubmit={handleSubmit}>
                <Label>
                    Name:
                    <Input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </Label>
                <Label>
                    Position:
                    <Input 
                        type="text" 
                        value={position} 
                        onChange={(e) => setPosition(e.target.value)} 
                        required 
                    />
                </Label>
                <Button type="submit">Add Employee</Button>
                {error && <Error>{error}</Error>}
            </Form>
        </FormContainer>
    );
};

const FormContainer = styled.div`
    padding: 20px;
    background-color: #333;
    border-radius: 8px;
    color: white;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 10px;
`;

const Input = styled.input`
    padding: 10px;
    margin-top: 5px;
    border-radius: 4px;
    border: none;
`;

const Button = styled.button`
    padding: 10px;
    border-radius: 4px;
    border: none;
    background-color: #1e90ff;
    color: white;
    cursor: pointer;
    margin-top: 10px;
`;

const Error = styled.p`
    color: red;
    margin-top: 10px;
`;

export default EmployeeForm;
