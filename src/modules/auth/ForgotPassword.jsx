import React, { useState } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AxiosClientWithInterceptors } from '../../shared/plugins/axios';
import { useNavigate } from 'react-router-dom'; // Cambiado a useNavigate

const ForgotPassword = ({ onBackToLoginClick }) => {
  const [tokenSent, setTokenSent] = useState(false);
  const navigate = useNavigate(); // Cambiado de useHistory a useNavigate

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      status: true,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Campo obligatorio"),
      email: yup.string().email("Correo electrónico no válido").required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        let response = await AxiosClientWithInterceptors.post(
          'http://localhost:8080/api-sysstock/recovery/',
          values
        );

        if (response.data.success && response.statusCode === 200) {
          console.log(values);
          console.log("Solicitud enviada con éxito");
          
          navigate('/recovery-password'); // Cambiado de history.push a navigate
        } else {
          console.error('Error al enviar la solicitud. Usuario no existente.');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error.message);
      }
    },
  });

  const handleBackClick = (e) => {
    e.preventDefault();
    onBackToLoginClick();
  };

  return (
    <Col className=" d-flex align-items-center justify-content-center gradient-custom-2">
      <Card.Body className="p-md mx-md-20">
        <Form onSubmit={formik.handleSubmit} className="text-center">
          <>
            <Form.Group className="form-outline mb-2">
              <Form.Label htmlFor="name">Nombre:</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                placeholder="Ingrese su nombre"
                autoComplete="off"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mx-auto form-control" // Añadido "mx-auto" y "form-control" para centrar y dar estilo al input
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="form-outline mb-2">
              <Form.Label htmlFor="email">Correo electrónico:</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="Ingrese su correo electrónico"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mx-auto form-control" // Añadido "mx-auto" y "form-control" para centrar y dar estilo al input
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </Form.Group>
          </>

          <div className="text-center">
            <Button
              variant="secondary"
              className="btn-hover gradient-custom-2"
              type="submit"
            >
              <FeatherIcon icon="send" /> Enviar solicitud
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
