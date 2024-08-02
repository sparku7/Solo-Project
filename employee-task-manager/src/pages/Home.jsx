import React, { useEffect, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import styled from 'styled-components';
import axios from 'axios';
import EmployeeForm from '../components/AddEmployee';

const Home = () => {
    const [employees, setEmployees] = useState([]);

    // Fetch employees when the component mounts
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Fetch employees from the server
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    // Handle employee deletion
    const handleDelete = (id) => {
        setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
    };

    return (
        <Container>
            <h1>Employees</h1>
            <EmployeeForm onEmployeeAdded={fetchEmployees} />
            <EmployeeGrid>
                {employees.map(employee => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        onDelete={handleDelete}
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
