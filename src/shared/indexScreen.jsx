import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const IndexScreen = () => {
  useEffect(() => {
    // Simulamos el cambio de ruta después de un tiempo (puedes ajustar el tiempo según tus necesidades)
    const timeoutId = setTimeout(() => {
      // Redirige a la página de inicio de sesión usando Navigate
      return <Navigate to="/auth" />;
    }, 30); // Redirige después de 3 segundos (ajusta según tus necesidades)

    // Limpieza del temporizador para evitar fugas de memoria
    return () => clearTimeout(timeoutId);
  }, []); // La dependencia vacía asegura que este efecto se ejecute solo una vez al montar el componente

  // No se renderiza nada en la pantalla de IndexScreen
  return null;
};

export default IndexScreen;
