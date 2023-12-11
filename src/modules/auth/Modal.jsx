import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es"; // Importa el idioma español
import "../auth/css/estilos.css";

registerLocale("es", es);

const CustomModal = (props) => {
  const [validated, setValidated] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    // Aquí puedes agregar la lógica para enviar el formulario al servidor
    // y manejar los posibles errores

    setValidated(false); // Restablece el estado de validación después de enviar
  };

  return (
    <>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton className="custom-modal2">
          <Modal.Title id="contained-modal-title-vcenter">
            Añadir equipo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal">
          <Container>
            <Row>
              <Col>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Seleccionar imagen (.png, .jpg)</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".png, .jpg"
                      onChange={handleFileChange}
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="name1">
                      <Form.Label>Nombre:</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Laptop"
                      />
                      <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="categoria1">
                      <Form.Label>Categoría</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Informática"
                      />
                      <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-6">
                    <Form.Group as={Col} md="6" controlId="descripcion1">
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control type="text" placeholder="..." required />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese una descripción
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="fecha1">
                      <Form.Label>Fecha</Form.Label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="MM-dd-yyyy"
                        placeholderText="MM-DD-YYYY"
                        className="form-control"
                        required
                        locale={es} // Establece el idioma español
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese la fecha de registro
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Button variant="success" type="submit">
                    Guardar
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;
