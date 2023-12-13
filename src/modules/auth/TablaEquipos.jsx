import React from 'react';
import Home from './Home';
import { Routes, Route, Link } from 'react-router-dom';



const CustomTable = () => {
  return (

    <>
  <Home/>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#"><h1>SYSTOCK</h1></a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/equipos" className="nav-link">Equipos</Link>
              </li>
              <li className="nav-item">
                <Link to="/usuarios" className="nav-link">Usuarios</Link>
              </li>
              <li className="nav-item">
                <Link to="/prestamos" className="nav-link disabled" tabIndex="-1" aria-disabled="true">Prestamos</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <form className="d-flex">
        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>

      <div className="mt-4"> {/* Espacio para separar el navbar del contenido */}
        <Routes>
          {/* Define las rutas secundarias aquí */}
          <Route path="/equipos" element={<CustomTable />} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </div>
    
    <div>
      <table striped bordered hover className='shadow'>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {/* ... Contenido de la tabla ... */}
        </tbody>
      </table>
    </div>
    </>

  );
};

export default CustomTable;
