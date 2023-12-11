import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Usuarios from './Usuarios';
import "../auth/css/estilos.css"
export default function  CustomNavbar(){
    return <>
    <Navbar collapseOnSelect expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="#home">SysStock</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Equipos</Nav.Link>
            <Nav.Link href="/Usuarios">Usuarios</Nav.Link>
            <Nav.Link href="#pricing">Préstamos</Nav.Link>

            {/* <NavDropdown title="Préstamos" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Historial de préstamos</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Solicitar préstamo</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Perfil</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Salir
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </>

    
}
