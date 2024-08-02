import React, { useEffect, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import EmployeeForm from '../components/AddEmployee'; // Import the EmployeeForm component
import styled from 'styled-components';
import axios from 'axios';

const Home = () => {
    const [employees, setEmployees] = useState([]);

    // Fetch employees when the component mounts
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    // Handle employee deletion
    const handleEmployeeDelete = (id) => {
        setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
    };

    // Handle new employee addition
    const handleEmployeeAdded = () => {
        fetchEmployees();
    };

    return (
        <Container>
            <h1>Employees</h1>
            <EmployeeForm onEmployeeAdded={handleEmployeeAdded} />
            <EmployeeGrid>
                {employees.map(employee => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        onDelete={handleEmployeeDelete}
                    />
                ))}
            </EmployeeGrid>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    margin-top: 60px;
`;

const EmployeeGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

export default Home;
