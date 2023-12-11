import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { LoginScreen } from "../modules/auth/LoginSecreen";
import { AuthContext } from "../modules/auth/authContext";
import { IndexScreen } from "./indexScreen";
import RecoveryPassword from "../modules/auth/RecoveryPassword"; // Asegúrate de importar correctamente RecoveryPassword
import ForgotPassword from "../modules/auth/ForgotPassword";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginScreen />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/recoverypassword" element={<RecoveryPassword />} />
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
