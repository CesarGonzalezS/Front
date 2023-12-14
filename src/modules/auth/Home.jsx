// Home.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import "../auth/css/home.css"; // Cambiado el nombre de la importación


export const Home = ({showModal}) => {

  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#"><h2>SYSTOCK</h2></a>
            <ul className="navbar-nav me-auto mb-4 mb-lg-0">
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

      <form className="d-flex mt-2">
        <input className="" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>

      
    </>
  );
};

export default Home;
