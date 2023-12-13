import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import Alert from "../../shared/plugins/alerts";
import { AxiosClientWithInterceptors } from "../../shared/plugins/axios";
import Logo from "../auth/img/Captura.png";

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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Card
        className="bg-secondary"
        style={{
          width: "500px",
          height: "500px",
        }}
      >
<Card.Body style={{ backgroundColor: '#002E60' }}>
          <div className="d-flex align-items-center justify-content-center">
            <div>
              <img src={Logo} alt="Logo" style={{ height: "100px" }} />
              <h4 className="mt-2 pb-2 text-white">Recupera tu Cuenta</h4>
            </div>
          </div>
          <h5 className="text-white text-center">
            Te enviamos un correo con la palabra secreta para restablecer la
            contraseña
          </h5>
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
                  border: "none",
                  borderBottom: "1px solid #1971AB",
                }}
                value={formik.values.secretPass}
                onChange={formik.handleChange}
              />
              {formik.errors.secretPass ? (
                <span className="error-text">{formik.errors.secretPass}</span>
              ) : null}
            </Form.Group>
            <h5 className=" text-white ">Ingresa tu nueva contrasena</h5>
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
                  border: "none",
                  borderBottom: "2px solid #1971AB",
                }}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
              />
              {formik.errors.newPassword ? (
                <span className="error-text">{formik.errors.newPassword}</span>
              ) : null}
            </Form.Group>
            <Form.Group className="form-outline">
              <div className="text-center">
                <Button
                  variant="primary"
                  className="btn-hover"
                  type="submit"
                  style={{
                    width: "400px",
                    height: "50px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginTop: "10px",
                  }}
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
