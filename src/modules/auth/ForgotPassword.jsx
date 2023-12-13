import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AxiosClientWithInterceptors } from "../../shared/plugins/axios";
import { useNavigate } from "react-router-dom"; // Cambiado a useNavigate
import RecoveryPassword from "../auth/RecoveryPassword";

export const ForgotPassword = ({ onBackToLoginClick }) => {
  const navigate = useNavigate(); // Cambiado de useHistory a useNavigate

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      status: true,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Campo obligatorio"),
      email: yup
        .string()
        .email("Correo electrónico no válido")
        .required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        let response = await AxiosClientWithInterceptors.post(
          "http://localhost:8080/api-sysstock/recovery/",
          values
        );

        console.log("Respuesta del servidor:", response);

        if (!response.data.error) {
          console.log(values);
          console.log("Solicitud enviada con éxito");

          navigate("/RecoveryPassword", { state: { email: values.email } });
        } else {
          console.error("Error al enviar la solicitud. Usuario no existente.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
      }
    },
  });

  useEffect(() => {
    document.title = "SYSTOCK | Recuperar contrasena";
  }, []);

  const handleBackClick = (e) => {
    e.preventDefault();
    onBackToLoginClick();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f2f2f2",
      }}
    >
      <Card
        className="bg-secondary"
        style={{
          width: "504px",
          height: "504px",
        
          backgroundColor: "#002E60 !important",
        }}
      >
<Card.Body style={{ backgroundColor: '#002E60' }}>
          <div className="d-flex align-items-center justify-content-center" >
            <div>
              <h4 className="mt-3 text-white">¿Olvidaste tu Contrasena?</h4>
            </div>
          </div>
          <h5 className="text-white text-center mt-3">
            No te preocupes ! Escribe tu nombre y correo y te enviaremos la
            palabra secreta para restablecer la contraseña
          </h5>
          <Form onSubmit={formik.handleSubmit} className="text-center">
            <>
              <Form.Group className="form-outline mb-1 text-white">
                <Form.Label htmlFor="name">Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nombre"
                  autoComplete="off"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mx-auto form-control " // Añadido "mx-auto" y "form-control" para centrar y dar estilo al input
                  style={{ width: "400px", background: "white" }}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-danger">{formik.errors.name}</div>
                ) : null}
              </Form.Group>

              <Form.Group className="form-outline mb-5 text-white">
                <Form.Label htmlFor="email">Correo electrónico:</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Correo Electronico"
                  autoComplete="off"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mx-auto form-control" // Añadido "mx-auto" y "form-control" para centrar y dar estilo al input
                  style={{ width: "400px" }}
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
                style={{
                  backgroundColor: "#009574",
                  color: "#fff",
                  width: "400px",
                }}
                disabled={formik.isSubmitting} // Deshabilita el botón durante la solicitud
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
      </Card>
    </div>
  );
};

export default ForgotPassword;
