import React from 'react';
import { Form, Button, Col, Card } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';

const ForgotPassword = ({ onBackToLoginClick }) => {
  const handleBackClick = (e) => {
    e.preventDefault();
    onBackToLoginClick();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agrega lógica para enviar la solicitud de recuperación de contraseña
  };

  return (
    <Col className="clo-lg-6 d-flex align-items-center justify-content-center gradient-custom-2">
      <Card.Body className="p-md mx-md-20">
        <div className="text-center">
          <div style={{ textAlign: 'center' }}>
            <div id="logo"></div>
            <h2>Recuperar Contraseña</h2>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="form-outline mb-1">
            <Form.Label htmlFor="email">Correo electrónico:</Form.Label>
            <Form.Control
              placeholder="Ingrese su correo electrónico"
              id="email"
              autoComplete="off"
              // Agrega lógica para manejar cambios en el correo electrónico si es necesario
            />
          </Form.Group>

          <div className="text-center">
            <Button
              variant="secondary"
              className="btn-hover gradient-custom-2"
              type="submit"
            >
              Enviar solicitud
              <FeatherIcon icon="send" />
            </Button>
          </div>

          <div className="text-center mt-3">
            <a href="#" onClick={handleBackClick} rel="noopener noreferrer">
              Volver al inicio de sesión
            </a>
          </div>
        </Form>
      </Card.Body>
    </Col>
  );
};

export default ForgotPassword;
