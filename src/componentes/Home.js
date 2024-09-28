import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Franja from './Franja.js'; 
import img1 from '../imagenes/img1.png'; 
import img2 from '../imagenes/img2.png';
import crear from '../imagenes/crear.png';
import carruselimg1 from '../imagenes/carruselimg1.png'
import carruselimg2 from '../imagenes/carruselimg2.png'
import carruselimg3 from '../imagenes/carruselimg3.png'

export const Home = () => {
  return (
    <div className="container-fluid d-flex flex-column">
       <Franja onLogout={() => console.log('Logout clicked')} />
      {/* Carrusel */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="d-block w-100 bg-light text-center p-4" >
              <h4>Gestión de Casos Forenses</h4>
              <p>Desde aquí puedes gestionar y acceder a la información forense de manera segura y confiable, utilizando la tecnología Blockchain para asegurar la integridad y trazabilidad de los datos.</p>
              <img src={carruselimg3} className="imagenesCarrusel" style={{ height: '150px' }}></img>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-block w-100 bg-light text-center p-4">
              <h4>Seguridad de Datos</h4>
              <p>Implementamos tecnologías avanzadas para garantizar la seguridad y privacidad de los datos forenses. Nuestra solución está diseñada para proteger la integridad de la información en todo momento.</p>
              <img src={carruselimg2} className="imagenesCarrusel" style={{ height: '120px' }}></img>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-block w-100 bg-light text-center p-4" >
              <h4>Acceso Simplificado</h4>
              <p>Accede a la información forense de manera intuitiva y fácil. Nuestra interfaz permite una navegación sencilla, permitiendo a los usuarios encontrar la información que necesitan sin complicaciones.</p>
              <img src={carruselimg1} className="imagenesCarrusel" style={{ height: '120px' }}></img>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

        <br/><hr/>

      {/* Módulos principales */}
      <div className="modules-container">
        <div className="module">
          <img src={img1} alt="Gestión de Casos Activos" className="module-image" />
          <h4 className="module-title">Gestión de Casos Activos</h4>
          <p className="module-text">En este módulo, puedes gestionar todos los casos forenses que están actualmente en curso. Revisa el estado de cada caso, actualiza la información y da seguimiento en tiempo real, asegurando la integridad de los datos a través de la tecnología blockchain.</p>
          <Link to="/casos-activos">
          <button className="btn btn-primary module-btn">Ingresar</button>
          </Link>
        </div>
        <div className="module">
          <img src={img2} alt="Consulta de Casos Cerrados" className="module-image" />
          <h4 className="module-title">Consulta de Casos Cerrados</h4>
          <p className="module-text">Accede a los casos archivados o finalizados. Aquí podrás consultar el historial completo de cada caso, verificando toda la documentación y detalles que fueron gestionados durante el proceso, con la seguridad de que la información está protegida y es inmutable.</p>
          <Link to="/casos-cerrados">
          <button className="btn btn-primary module-btn">Ingresar</button>
          </Link>
        </div>
        <div className="module">
          <img src={crear} alt="Centro de Ayuda y Soporte" className="module-image" />
          <h4 className="module-title">Crear Nuevo Caso</h4>
          <p className="module-text">En este módulo, podrás crear nuevos casos, agregando la inforación necesaria para cada caso.</p>
          <br/><br/><br/><br/>
          <Link to="/crear-caso">
          <button className="btn btn-primary module-btn">Ingresar</button>
          </Link>
        </div>
      </div>

      {/* Margen verde al final de la pantalla */}
      <div className="footer-margin"></div>
    </div>
  );
};

export default Home;
