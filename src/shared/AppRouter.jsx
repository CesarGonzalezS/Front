// AppRouter.jsx
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginScreen } from "../modules/auth/LoginSecreen";
import { AuthContext } from "../modules/auth/authContext";
import IndexScreen from "./indexScreen";
import RecoveryPassword from "../modules/auth/RecoveryPassword";
import ForgotPassword from "../modules/auth/ForgotPassword";
import Home from "../modules/auth/Home";
import Perfil from "../modules/auth/Perfil";
import Prestamo from "../modules/auth/Prestamos";
import Salir from "../modules/auth/Salir";
import Stock from "../modules/auth/Stock";
import EquiposList from "../modules/auth/Equipos";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginScreen />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/recoverypassword" element={<RecoveryPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/equipos" element={<EquiposList />} />

        <Route
          path="/*"
          element={
            <React.Fragment>
              {user ? <Navigate to="/home" /> : <Navigate to="/auth" />}
            </React.Fragment>
          }
        />

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  );
};
