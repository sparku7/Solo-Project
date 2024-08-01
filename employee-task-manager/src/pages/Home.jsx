import React, { useEffect, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import styled from 'styled-components';
import axios from 'axios';
import EmployeeForm from '../components/AddEmployee';

const Home = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('/api/employees')
            .then(response => setEmployees(response.data))
            .catch(error => console.error('Error fetching employees:', error));
    }, []);

    return (
        <Container>
            <h1>Employees</h1>
            <EmployeeForm />
            <EmployeeGrid>
                {employees.map(employee => (
                    <EmployeeCard key={employee.id} employee={employee} />
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
