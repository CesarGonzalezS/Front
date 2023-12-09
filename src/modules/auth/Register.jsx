import React from "react";
import { useFormik } from "formik";
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import FeatherIcon from "feather-icons-react";
import * as yup from "yup";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./css/Register.css";

export const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: 1,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Campo obligatorio"),
      email: yup.string().required("Campo obligatorio"),
      password: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        // Imprimir el objeto values antes de enviar la solicitud
        console.log("Datos a enviar:", values);

        let response = await AxiosClient.post(
          "http://localhost:8080/api-sysstock/user/",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).catch(error => {
          console.error("Error en la solicitud Axios:", error);
        });
        

        console.log("Respuesta del servidor:", response);

        if (response.statusCode === 200) {
          // Registro exitoso
          Alert.fire({
            title: "Registro Exitoso",
            text: "El usuario se registró correctamente.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        } else {
          // Error en el registro
          Alert.fire({
            title: "Error en el Registro",
            text: "Hubo un problema al registrar el usuario.",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        }
      } catch (error) {
        // Manejo de errores
        console.error("Error al registrar al usuario:", error);

        if (error.response) {
          console.error("Error de servidor:", error.response.data);
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor");
        } else {
          console.error(
            "Error de configuración de la solicitud:",
            error.message
          );
        }

        Alert.fire({
          title: "Error",
          text: "Ocurrió un error al intentar registrar al usuario.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      }
    },
  });

  return (
    <>
      <div>
        <section className=" gradient-form">
          <Container>
            <Row className="d-flex justify-content-center align-items-center h-130">
              <Col className="col-xl-70 h-100 w-100 d-flex align-items-center justify-content-center">
                <Card
                  className="rounded-1  text-black"
                  id="pruebita2"
                  style={{ height: "100%" , width:"100%"}}
                >
                  <Card.Body className="p-md mx-md-20 ">
                    <div className="text-center">
                      <div id="logo" className=""></div>
                      <h2 className="mb-3">¿Eres nuevo aquí?</h2>
                      <h4 className="mb-5">
                        Regístrate para poder empezar a hacer uso de nuestro
                        Sistema
                      </h4>
                    </div>
                    <Form
                      onSubmit={formik.handleSubmit}
                      className="d-flex flex-column align-items-center"
                    >
                      <Form.Group className="form-outline ">
                        <Form.Control
                          placeholder="20213TN065@Utez.edu.mx"
                          id="email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          className="form-control-sm "
                          style={{ width: "400px" }}
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

                      <Form.Group className="form-outline mb-1">
                        <Form.Control
                          placeholder="Nombre"
                          id="name"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          className="form-control-sm "
                          style={{ width: "400px" }}
                        />
                        <Form.Label htmlFor="name">Nombre:</Form.Label>
                        {formik.errors.name && (
                          <span className="error-text">
                            {formik.errors.name}
                          </span>
                        )}
                      </Form.Group>

                      <Form.Group className="form-outline mb-3">
                        <Form.Control
                          placeholder="**********"
                          id="password"
                          name="password"
                          type="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          className="form-control-sm "
                          style={{ width: "400px" }}
                        />
                        <Form.Label htmlFor="password">Contraseña:</Form.Label>
                        {formik.errors.password && (
                          <span className="error-text">
                            {formik.errors.password}
                          </span>
                        )}
                      </Form.Group>

                      <Form.Group className="form-outlile mb-5">
                        <div className="text-center  pb-1">
                          <Button
                            variant="secondary"
                            className="btn-hover gradient-custom-3"
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
