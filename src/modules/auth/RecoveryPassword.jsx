import React, { useState } from "react";
import { Card, Container, Figure, Form, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import Alert from "../../shared/plugins/alerts";
import { AxiosClientWithInterceptors } from "../../shared/plugins/axios";


    const RecoveryPassword = () => {
        const navigate = useNavigate();
        const location = useLocation();
        const { email } = location.state || {};
      
        const [loading, setLoading] = useState(false);
      
        const formik = useFormik({
          initialValues: {
            email: email || "",
            secretPass: "",
            newPassword: "",
          },
          validationSchema: yup.object().shape({
            newPassword: yup
              .string()
              .required("Campo Obligatorio")
              .min(8, "Mínimo 8 Caracteres"),
            secretPass: yup.string().required("Campo Obligatorio"),
          }),
          onSubmit: async (values) => {
            setLoading(true);
            try {
              const tokenReset = localStorage.getItem("reset_password");
              const response = await AxiosClientWithInterceptors.put(
                "/recovery/updatePassword",
                values,
                {
                  headers: {
                    Authorization: `Bearer ${tokenReset}`,
                    "Content-Type": "application/json",
                  },
                }
              );
      
              console.log("Respuesta del servidor:", response);
      
              if (!response.data.error) {
                Alert.fire({
                  title: "Contraseña Actualizada",
                  text: "Ya puedes iniciar Sesión con tu nueva contraseña",
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Aceptar",
                });
      
                // Redirige a la pantalla de inicio de sesión después de una actualización exitosa
                navigate("/LoginScreen");
              } else {
                throw new Error(response.data.error);
              }
      } catch (error) {
        console.error("Error en la solicitud:", error.message);

        if (error.response) {
          console.error("Respuesta del servidor:", error.response.data);
          console.error("Código de estado:", error.response.status);
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor");
        } else {
          console.error(
            "Error durante la configuración de la solicitud:",
            error.message
          );
        }

        Alert.fire({
          title: "Contraseña No Válida",
          text: "Vuelve a ingresar la contraseña",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      } finally {
        setLoading(false);
      }
      console.log("Estos son los valores que se envían al servicio", values);
    },
  });

  return (
    <div>
      <Card className="bg-secondary">
        <Card.Body className="p-md-4 mx-md-5">
          <div className="d-flex align-items-center justify-content-center ">
            <Figure className="mx-1 mb-2"></Figure>
            <div>
              <h3 className="mt-1 mb-3 pb-2 text-white"> | Cuenta</h3>
            </div>
          </div>
          <h4 className="mt-1 mb-4 text-white text-center">
            Recuperar Contraseña
          </h4>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="form-outline mb-4">
              <Form.Label htmlFor="secretPass" className="text-white mb-0">
                Palabra clave{" "}
              </Form.Label>
              <Form.Control
                id="newPasswsecretPassord"
                autoComplete="off"
                name="secretPass"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  borderBottom: "3px solid #1971AB",
                  color: "white",
                }}
                className="mb-3"
                value={formik.values.secretPass}
                onChange={formik.handleChange}
              />
              {formik.errors.secretPass ? (
                <span className="error-text">{formik.errors.secretPass}</span>
              ) : null}
            </Form.Group>
            <Form.Group className="form-outline mb-4">
              <Form.Label htmlFor="newPassword" className="text-white mb-0">
                Nueva contraseña
              </Form.Label>
              <Form.Control
                type="password"
                id="newPassword"
                autoComplete="off"
                name="newPassword"
                className="mb-3"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  borderBottom: "3px solid #1971AB",
                  color: "white",
                }}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
              />
              {formik.errors.newPassword ? (
                <span className="error-text">{formik.errors.newPassword}</span>
              ) : null}
            </Form.Group>
            <Form.Group className="form-outline mb-4">
              <div className="text-center pt-4">
                <Button
                  variant="primary"
                  className="btn-hover "
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  <FeatherIcon icon={"log-in"} />
                  &nbsp; Enviar
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RecoveryPassword;
