import React, { useEffect, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import EmployeeForm from '../components/AddEmployee'; // Import the EmployeeForm component
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    // Fetch employees when the component mounts or the search query changes
    useEffect(() => {
        fetchEmployees();
    }, [query]);

    const fetchEmployees = async () => {
        try {
            const response = query 
                ? await axios.get(`http://localhost:8081/api/employees/search?query=${query}`)
                : await axios.get('http://localhost:8081/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setError(error.message);
        } finally {
            setLoading(false);
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

    if (loading) return <p>Loading employees...</p>;
    if (error) return <p>Error fetching employees: {error}</p>;

    return (
        <Container>
            <h1>Employees</h1>
            <EmployeeForm onEmployeeAdded={handleEmployeeAdded} />
            <EmployeeGrid>
                {employees.length ? (
                    employees.map(employee => (
                        <EmployeeCard
                            key={employee.id}
                            employee={employee}
                            onDelete={handleEmployeeDelete}
                        />
                    ))
                ) : (
                    <NoEmployeesMessage>No employees found.</NoEmployeesMessage>
                )}
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

const NoEmployeesMessage = styled.p`
    color: #ff4d4f;
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    width: 100%;
    padding: 20px;
    background: #f0f0f0;
    border-radius: 8px;
    margin: 10px 0;
`;

export default Home;
