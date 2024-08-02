import React, { useEffect, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import styled from 'styled-components';
import axios from 'axios';
import EmployeeForm from '../components/AddEmployee';

const Home = () => {
    const [employees, setEmployees] = useState([]);

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/employees/${id}`);
            setEmployees(employees.filter(employee => employee.id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container>
            <h1>Employees</h1>
            <EmployeeForm refreshEmployees={fetchEmployees} />
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
