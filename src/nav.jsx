import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Inicio() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">INICIO</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#Products">PRODUCTS</Nav.Link>
          <Nav.Link href="#Logout">SALIR</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
