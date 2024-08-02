import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = ({ onEmployeeAdded }) => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8081/api/employees', { name, position });
            setName('');
            setPosition('');
            onEmployeeAdded(); // Call the passed function to refetch employees
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            />
            <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Position"
                required
            />
            <button type="submit">Add Employee</button>
        </form>
    );
};

export default EmployeeForm;
