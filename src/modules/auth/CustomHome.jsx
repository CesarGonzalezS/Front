import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import CustomNavbar from '../auth/Nabvar';

export default function CustomHome() {
  const [modalShow, setModalShow] = useState(false);
  const [products, setProducts] = useState([]);

  // useEffect para cargar los productos con axios

  return (
    <>
      <CustomNavbar />
      {/* Aquí puedes agregar una ruta o lógica para cambiar el contenido debajo del Navbar */}
      <Table striped bordered hover className='shadow'>
        <thead>
          {/* Encabezados de la tabla */}
        </thead>
        <tbody>
          {/* Contenido de la tabla */}
        </tbody>
      </Table>
    </>
  );
}
