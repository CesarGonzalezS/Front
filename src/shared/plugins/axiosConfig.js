// axiosConfig.js

import axios from "axios";

const AxiosClientWithInterceptors = axios.create();

// Agregar interceptores según sea necesario
AxiosClientWithInterceptors.interceptors.request.use(
  (config) => {
    // Agregar encabezados de autenticación, etc.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosClientWithInterceptors.interceptors.response.use(
  (response) => {
    // Manejar la respuesta según sea necesario
    return response;
  },
  (error) => {
    // Manejar errores de respuesta según sea necesario
    return Promise.reject(error);
  }
);

export { AxiosClientWithInterceptors };
