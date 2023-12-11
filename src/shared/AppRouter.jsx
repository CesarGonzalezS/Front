import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginScreen } from "../modules/auth/LoginSecreen";
import { AuthContext } from "../modules/auth/authContext";
import { IndexScreen } from "./indexScreen";
import RecoveryPassword from "../modules/auth/RecoveryPassword"; // Asegúrate de importar correctamente RecoveryPassword
import ForgotPassword from "../modules/auth/ForgotPassword";
import Home from "../modules/auth/Home";
import Modal from "../modules/auth/Modal";
import Nabvar from "../modules/auth/Nabvar";
import Perfil from "../modules/auth/Perfil";
import Prestamo from "../modules/auth/Prestamos";
import Salir from "../modules/auth/Salir";
import Stock from "../modules/auth/Stock";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginScreen />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/recoverypassword" element={<RecoveryPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/navbar" element={<Nabvar />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/prestamo" element={<Prestamo />} />
        <Route path="/salir" element={<Salir />} />
        <Route path="/stock" element={<Stock />} />

        {/* ... Otras rutas ... */}

        <Route
          path="/*"
          element={(() => {
            // Si no está logueado, puedes redirigirlo a otra parte o renderizar algo diferente
            return null;
          })()}
        />

        <Route path="/" element={<IndexScreen />} />

        <Route path="*" element={<>404</>} />
      </Routes>
    </Router>
  );
};
