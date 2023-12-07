
import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import Login from "./LoginSecreen";
import Register from "./Register";

const MainComponent = () => {
  const { user } = React.useContext(AuthContext);

  if (user.isLogged) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Login />
      {/* O cualquier otro componente que necesites, como Register */}
      <Register />
    </>
  );
};

export default MainComponent;
