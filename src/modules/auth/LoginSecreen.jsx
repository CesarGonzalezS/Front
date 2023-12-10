import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import * as yup from "yup";
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import RegisterForm from "./Register"; // Importa el componente RegisterForm desde Register.jsx
import "./css/login.css";
import ForgotPassword from "./ForgotPassword";
import MainComponent from "./MainComponent";

export const LoginScreen = ({ onForgotPasswordClick }) => {
  const { user, dispatch } = useContext(AuthContext);
  const navigation = useNavigate();
  // Define las variables de estado o contexto
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Define la función handleBackToLoginClick
  const handleBackToLoginClick = () => {
    // Lógica para manejar el clic y volver al inicio de sesión
    setShowForgotPassword(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Campo obligatorio"),
      password: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        let response = await AxiosClient.post(
          "http://localhost:8080/api-sysstock/auth/login",
          values
        );
        console.log(response);
        if (response.statusCode === 200) {
          const action = {
            type: "LOGIN",
            payload: response.data,
          };
          dispatch(action);
          navigation("/", { replace: true });
        } else {
          // Maneja el error aquí si el código de estado no es 200
          throw new Error(
            `Error en la solicitud. Código de estado: ${response.statusCode}`
          );
        }
      } catch (error) {
        // Maneja el error de Axios aquí
        if (error.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          console.error("Error de servidor:", error.response.data);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió respuesta
          console.error("No se recibió respuesta del servidor");
        } else {
          // Algo sucedió en la configuración de la solicitud que generó un error
          console.error(
            "Error de configuración de la solicitud:",
            error.message
          );
        }
        // Muestra el mensaje de alerta
        Alert.fire({
          title: "Error",
          text: "Ocurrió un error al intentar iniciar sesión.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonButtonText: "Aceptar",
        });
      }
    },
  });

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  

  useEffect(() => {
    document.title = "MT | Login";
  }, []);

  if (user.isLogged) {
    // Si el usuario ya está autenticado, redirige a la página principal
    return <Navigate to={"xd.jsx"} />;
  }
  return (
    <>
    <div>
      <section className="gradient-form">
        <Container className="py-5 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col className="col-xl-9">
              <Card className="rounded-3 text-black" id="pruebita2">
                <Row className="g-0">
                  {showForgotPassword ? (
                    // Renderiza el formulario de recuperación de contraseña
                    <ForgotPassword onBackToLoginClick={handleBackToLoginClick} />
                  ) : (
                    <>
                      <Col
                        className="col-lg-6 d-flex align-items-center justify-content-center gradient-custom-2"
                        id="left"
                      >
                        {/* Agrega el formulario de registro o de recuperación de contraseña aquí */}
                        {showForgotPassword ? (
                          <ForgotPassword onBackToLoginClick={handleBackToLoginClick} />
                        ) : (
                          <RegisterForm />
                        )}
                      </Col>
                          <Col className="col-lg-6 d-flex align-items-center justify-content-center gradient-custom-2">
                            <Card.Body className="p-md mx-md-20">
                              <div className="text-center">
                                <img
                                  src={require("./img/Captura.png")}
                                  style={{
                                    width: "40%",
                                    height: "40%",
                                    marginTop: "1px",
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                  }}
                                  alt="Captura"
                                />
                                <div style={{ textAlign: "center" }}>
                                  <div id="logo"></div>
                                  <h2>Inicio de sesión</h2>
                                </div>
                              </div>
                              <Form onSubmit={formik.handleSubmit}>
                                <Form.Group className="form-outline mb-1">
                                  <Form.Label htmlFor="email">Correo:</Form.Label>
                                  <Form.Control
                                    placeholder="20213tn00.edu.mx"
                                    id="email"
                                    autoComplete="off"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                  />
                                  {formik.errors.email ? (
                                    <span className="error-text">
                                      {formik.errors.email}
                                    </span>
                                  ) : null}
                                </Form.Group>
    
                                <Form.Group className="form-outline mb-1">
                                  <Form.Label htmlFor="password">
                                    {" "}
                                    Contraseña:
                                  </Form.Label>
                                  <Form.Control
                                    placeholder="**********"
                                    id="password"
                                    type="password"
                                    autoComplete="off"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                  />
                                  {formik.errors.password ? (
                                    <span className="error-text">
                                      {formik.errors.password}
                                    </span>
                                  ) : null}
                                </Form.Group>
                                <div className="text-center">
                                  <a
                                    href="#"
                                    onClick={handleForgotPasswordClick}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Olvidé mi contraseña
                                  </a>
                                </div>
    
                                <Form.Group className="form-outlile mb-4">
                                  <div className="text-center pt-1 pb-1">
                                    <Button
                                      variant="secondary"
                                      className="btn-hover gradient-custom-2"
                                      type="submit"
                                      id="botonIngresar"
                                      disabled={!(formik.isValid && formik.dirty)}
                                    >
                                      Iniciar sesión
                                      <FeatherIcon icon={"log-in"}>
                                        &nbsp; Iniciar sesión
                                      </FeatherIcon>
                                    </Button>
                                  </div>
                                </Form.Group>
                              </Form>
                            </Card.Body>
                          </Col>
                        </>
                      )}
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </>
    );
                                  };

export default LoginScreen;
