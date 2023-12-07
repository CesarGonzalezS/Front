// Register.jsx

import React from "react";
import { useFormik } from "formik";
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import FeatherIcon from "feather-icons-react";
import * as yup from "yup"; // Asegúrate de importar yup
import "./css/Register.css";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      fullName: yup.string().required("Campo Obligatorio"),
      email: yup
        .string()
        .email("Formato de correo no válido")
        .required("Campo Obligatorio"),
      password: yup.string().required("Campo Obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        // Realiza la solicitud POST para registrar al usuario
        const response = await AxiosClient.post("/api-sysstock/user", values);

        if (response.status === 201) {
          // Si el usuario se registró con éxito, puedes mostrar un mensaje de éxito
          Alert.fire({
            title: "Registro Exitoso",
            text: "El usuario se registró correctamente.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        } else {
          // Si hubo algún problema con la solicitud, muestra un mensaje de error
          Alert.fire({
            title: "Error en el Registro",
            text: "Hubo un problema al registrar el usuario.",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        }
      } catch (error) {
        // Maneja los errores que puedan ocurrir durante la solicitud
        console.error("Error al registrar al usuario:", error);
      }
    },
  });

  return (
    <>
      <div>
        <section className="h-100  gradient-form">
          <Container >
            <Row className="d-flex justify-content-center align-items-center h-100">
              <Col className="col-xl-20">
                <Card className="rounded-1 text-black" id="pruebita2">
                  <Card.Body className="p-md mx-md-10">
                    <div className="text-center">
                      {/* Ajusta el logo y otros elementos según tus necesidades */}
                      <div id="logo" className=""></div>
                      <h2>¿Eres nuevo aquí?</h2>
                      <h4>Regístrate para poder empezar a hacer uso de nuestro Sistema</h4>
                    </div>

                    <Form onSubmit={formik.handleSubmit}>
                      <Form.Group className="form-outline mb-2">
                        <Form.Control
                          id="fullName"
                          name="fullName"
                          value={formik.values.fullName}
                          onChange={formik.handleChange}
                          className="form-control-sm"
                          style={{ width: "300px" }}
                        />
                        <Form.Label htmlFor="fullName">
                          Nombre Completo:
                        </Form.Label>
                        {formik.errors.fullName && (
                          <span className="error-text">
                            {formik.errors.fullName}
                          </span>
                        )}
                      </Form.Group>

                      <Form.Group className="form-outline mb-2">
                        <Form.Control
                          placeholder="20213TN065@Utez.edu.mx"
                          id="email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          className="form-control-sm"
                          style={{ width: "300px" }}
                        />
                        <Form.Label htmlFor="email">
                          Correo Electrónico:
                        </Form.Label>
                        {formik.errors.email && (
                          <span className="error-text">
                            {formik.errors.email}
                          </span>
                        )}
                      </Form.Group>

                      <Form.Group className="form-outline mb-2">
                        <Form.Control
                          placeholder="**********"
                          id="password"
                          name="password"
                          type="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          className="form-control-sm"
                          style={{ width: "300px" }}
                        />
                        <Form.Label htmlFor="password">Contraseña:</Form.Label>
                        {formik.errors.password && (
                          <span className="error-text">
                            {formik.errors.password}
                          </span>
                        )}
                      </Form.Group>

                      <Form.Group className="form-outline mb-2">
                        <Form.Control
                          placeholder="**********"
                          id="password"
                          name="password"
                          type="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          className="form-control-sm"
                          style={{ width: "300px" }}
                        />
                        <Form.Label htmlFor="password">Confirmar Contraseña:</Form.Label>
                        {formik.errors.password && (
                          <span className="error-text">
                            {formik.errors.password}
                          </span>
                        )}
                      </Form.Group>

                      <Form.Group className="form-outlile mb-2">
                        <div className="text-center pt-1 pb-1">
                          <Button
                            variant="secondary"
                            className="btn-hover gradient-custom-1"
                            type="submit"
                            disabled={!(formik.isValid && formik.dirty)}
                          >
                            Registrarse
                            <FeatherIcon icon={"user-plus"}>
                              &nbsp; Registrarse
                            </FeatherIcon>
                          </Button>
                        </div>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>{" "}
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default RegisterForm;
