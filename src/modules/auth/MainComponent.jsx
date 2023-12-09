import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import Login from "./LoginSecreen";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

const MainComponent = () => {
  const { user } = React.useContext(AuthContext);
  const [currentForm, setCurrentForm] = useState("login");

  const switchToLogin = () => {
    setCurrentForm("login");
  };

  const switchToRegister = () => {
    setCurrentForm("register");
  };

  const switchToForgotPassword = () => {
    setCurrentForm("forgotPassword");
  };

  if (user.isLogged) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      {currentForm === "login" && (
        <Login onForgotPasswordClick={switchToForgotPassword} />
      )}
      {currentForm === "register" && <Register />}
      {currentForm === "forgotPassword" && <ForgotPassword onLoginClick={switchToLogin} />}
    </>
  );
};

export default MainComponent;
