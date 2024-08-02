import React, { useEffect, useState, useCallback } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import EmployeeForm from '../components/AddEmployee'; // Import the EmployeeForm component
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');

    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query');

    // Fetch employees when the component mounts or the search query changes
    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        try {
            const response = searchQuery 
                ? await axios.get(`http://localhost:8081/api/employees/search?query=${searchQuery}`)
                : await axios.get('http://localhost:8081/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    // Handle employee deletion
    const handleEmployeeDelete = (id) => {
        setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
    };

    // Handle new employee addition
    const handleEmployeeAdded = () => {
        fetchEmployees();
    };

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const encodedQuery = encodeURIComponent(query.trim());
        if (encodedQuery) {
            window.history.pushState(null, '', `?query=${encodedQuery}`);
        } else {
            window.history.pushState(null, '', '/');
        }
        fetchEmployees();
    };

    if (loading) return <p>Loading employees...</p>;
    if (error) return <p>Error fetching employees: {error}</p>;

    return (
        <Container>
            <h1>Employees</h1>
            <EmployeeForm onEmployeeAdded={handleEmployeeAdded} />
            <SearchForm onSubmit={handleSearchSubmit}>
                <SearchInput
                    type="text"
                    placeholder="Search for an employee..."
                    value={query}
                    onChange={handleSearchChange}
                />
                <SearchButton type="submit">Search</SearchButton>
            </SearchForm>
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

const SearchForm = styled.form`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const SearchInput = styled.input`
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin-right: 10px;
`;

const SearchButton = styled.button`
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
`;

export default Home;
