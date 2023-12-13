// Usuarios.jsx
import React from 'react';
import { Table } from 'react-bootstrap';  // Importa el componente Table de react-bootstrap o cualquier otra librería que prefieras

export const Usuarios = () => {
  // Datos ficticios para llenar la tabla
  const usuariosData = [
    { id: 1, nombre: 'Usuario 1', correo: 'usuario1@example.com' },
    { id: 2, nombre: 'Usuario 2', correo: 'usuario2@example.com' },
    { id: 3, nombre: 'Usuario 3', correo: 'usuario3@example.com' },
  ];

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {usuariosData.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Usuarios ;
