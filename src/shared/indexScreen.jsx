import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

export const IndexScreen = () => {
  useEffect(() => {
    // Simulamos el cambio de ruta después de un tiempo (puedes ajustar el tiempo según tus necesidades)
    const timeoutId = setTimeout(() => {
      window.location.href = "/auth"; // Redirige a la página de inicio de sesión
    }, 30);

    // Limpieza del temporizador para evitar fugas de memoria
    return () => clearTimeout(timeoutId);
  }, []); // La dependencia vacía asegura que este efecto se ejecute solo una vez al montar el componente

  // No se renderiza nada en la pantalla de IndexScreen
  return null;
};
