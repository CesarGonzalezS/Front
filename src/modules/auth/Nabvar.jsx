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

          
          <Nav.Link href="/TablaEquipos">Equipos</Nav.Link>
          //Teoriorica mente cuando precione TablaEquips me mostrara el contenido de tabla equipos en el home
          <Nav.Link href="/usuarios">Usuarios</Nav.Link>
          <Nav.Link href="/prestamos">Préstamos</Nav.Link>
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
