import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <>
      <StyledNavbar expand="lg" expanded={expanded}>
        <Container>
          <StyledBrand as={Link} to="/">To Don't List</StyledBrand>
          <Navbar.Collapse id="basic-navbar-nav">
            <StyledNav onClick={() => setExpanded(false)}>
              <StyledLink to="/">Home</StyledLink>
              <StyledLink to="/tasks">Tasks</StyledLink>
            </StyledNav>
            <SearchForm onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchButton type="submit">Search</SearchButton>
            </SearchForm>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>
    </>
  );
}

const StyledNavbar = styled(Navbar)`
  background: #343a40;
  border-bottom: 2px solid #007bff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const StyledBrand = styled(Navbar.Brand)`
  color: #ffffff;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const StyledNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;

  &:hover {
    background-color: #007bff;
    color: #ffffff;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #007bff;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

const SearchForm = styled.form`
  display: flex;
  margin-left: auto;
`;

const SearchInput = styled.input`
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  padding: 0.5em;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default NavBar;
