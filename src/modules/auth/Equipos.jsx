import React, { useState, useEffect } from "react";
import { AxiosClientWithInterceptors } from "../../shared/plugins/axios";
import Home from "./Home";
import Table from "react-bootstrap/Table";
import EquiposModalButton from './EquiposModalButton'; // Importa el nuevo componente


const EquiposList = () => {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await AxiosClientWithInterceptors.get(
          "http://localhost:8080/api-sysstock/equipos/"
        );
        console.log("Respuesta completa de la API:", response);

        if (response.data && response.data.length > 0) {
          console.log("Datos recibidos:", response.data);
          setEquipos(response.data); // Actualizamos el estado con response.data
        } else {
          console.error(
            "La respuesta de la API no contiene elementos en la propiedad data:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error al obtener equipos:", error);
        if (error.response) {
          console.error("Respuesta del servidor:", error.response.data);
          console.error("Código de estado:", error.response.status);
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor");
        } else {
          console.error(
            "Error de configuración de la solicitud:",
            error.message
          );
        }
      }
    };

    fetchEquipos();
  }, []);

  return (
    <>
      <Home />

      <div>
        <div className="d-flex align-items-center justify-content-between">
          <h2>Lista de Equipos</h2>
          <EquiposModalButton />

        </div>
        {equipos.length > 0 ? (
          <Table striped bordered hover className="shadow">
            <thead>
              <tr>
                <th>ID</th>
                <th>Equipo</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {equipos.map((equipo) => (
                <tr key={equipo.id}>
                  <td>{equipo.id}</td>

                  <td>
                    {equipo.profilePhoto &&
                      typeof equipo.profilePhoto === "string" && (
                        <img
                          src={`data:image/png;base64,${equipo.profilePhoto}`}
                          alt={`Imagen ${equipo.id}`}
                          style={{ maxWidth: "70px", maxHeight: "70px" }}
                        />
                      )}
                  </td>

                  <td>{equipo.name}</td>
                  <td>{equipo.description}</td>
                  <td>{new Date(equipo.fecha).toLocaleDateString()}</td>
                  <td>
                    {equipo.categoria ? equipo.categoria.name : "Sin categoría"}
                  </td>
                  <td>{equipo.status ? "Activo" : "Inactivo"}</td>
                  <td>{equipo.stock}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No hay equipos registrados.</p>
        )}
      </div>
    </>
  );
};

export default EquiposList;
