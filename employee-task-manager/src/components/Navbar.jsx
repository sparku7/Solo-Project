import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function NavBar() {
  const [expanded, setExpanded] = useState(false);

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
  text-decoration: none; /* Ensure no underline */
  font-size: 24px; /* Adjust font size as needed */
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
  gap: 20px; /* Adjust spacing between links */
`;

const StyledLink = styled(Link)`
  color: #ffffff;
  text-decoration: none; /* Ensure no underline */
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

export default NavBar;
