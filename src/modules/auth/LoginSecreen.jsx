// LoginScreen.jsx
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import * as yup from "yup";
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import RegisterForm from "./Register";  // Importa el componente RegisterForm desde Register.jsx
import "./css/login.css";

export const LoginScreen = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigation = useNavigate();

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
        const response = await AxiosClient({
          url: "/auth/login",
          method: "POST",
          data: JSON.stringify(values),
        });
        if (!response.error) {
          const action = {
            type: "LOGIN",
            payload: response.data,
          };
          dispatch(action);
          navigation("/", { replace: true });
        } else {
          throw Error(); // o manejar de otra manera según tus requisitos
        }
      } catch (err) {
        Alert.fire({
          title: "Verificar datos",
          text: "Usuario y/o contraseña incorrectos",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      }
    },
  });

  useEffect(() => {
    document.title = "MT | Login";
  }, []);

  if (user.isLogged) {
    // Si el usuario ya está autenticado, redirige a la página principal
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div>
        <section className="h-100 gradient-form">
          <Container className="py-5 h-100">
            <Row className="d-flex justify-content-center align-items-center h-90">
              <Col className="col-xl-10">
                <Card className="rounded-3 text-black" id="pruebita2">
                  <Row className="g-0">
                    <Col className="col-lg-6 d-none d-lg-block" id="left">
                      {/* Agrega el formulario de registro aquí */}
                      <RegisterForm />
                    </Col>
                    <Col className="clo-lg-5 d-flex align-items-center justify-content-center gradient-custom-2">
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
                            <Form.Label htmlFor="username">Correo:</Form.Label>
                            <Form.Control
                              placeholder="20213tn00.edu.mx"
                              id="username"
                              autoComplete="off"
                              name="username"
                              value={formik.values.username}
                              onChange={formik.handleChange}
                            />
                            {formik.errors.username ? (
                              <span className="error-text">
                                {formik.errors.username}
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
                              href=""
                              target="_blank"
                              rel="noopener noreferrer">
                              
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
                                disabled={!(formik.isValid && formik.dirty)}>
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
