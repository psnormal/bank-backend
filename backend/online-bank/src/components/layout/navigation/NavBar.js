import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';

function NavBar() {
  const [active, setActive] = useState('clients');
  return (
      <Navbar bg="dark" variant="dark" className='mb-4'>
        <Container fluid className='mx-4'>
          <Navbar.Brand as={Link} to="/">Bank</Navbar.Brand>
          <Nav className="me-auto" 
               activeKey={active}
               onSelect={(selectedKey) => setActive(selectedKey)}>
            <Nav.Link as={Link} to="/clients" eventKey="clients">Клиенты</Nav.Link>
            <Nav.Link as={Link} to="/employees" eventKey="employees">Сотрудники</Nav.Link>
            <Nav.Link as={Link} to="/credits" eventKey="credits">Управление кредитами</Nav.Link>
          </Nav>
          <Nav activeKey={active}
               onSelect={(selectedKey) => setActive(selectedKey)}>
            <Nav.Link href="#home">Вход</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default NavBar;