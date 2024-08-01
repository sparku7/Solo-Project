import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Navbar bg="light" expand="lg" className="custom-navbar fixed-top" expanded={expanded}>
        <Container>
          <Navbar.Brand href="/">To Don't List</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" onClick={() => setExpanded(false)}>
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/tasks">Tasks</Link>
                  </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
     </>
  );
}

export default NavBar;
