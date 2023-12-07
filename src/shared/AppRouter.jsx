import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginScreen } from "../modules/auth/LoginSecreen";
import { AuthContext } from "../modules/auth/authContext";
import { IndexScreen } from "./indexScreen";
import RegisterForm from "../modules/auth/Register"; // Importa RegisterForm en lugar de Register

export const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginScreen />} />
        <Route path="/auth" element={<LoginScreen />} />

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
