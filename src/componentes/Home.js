import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo2 from '../imagenes/logo2.png';
import menu from '../imagenes/menu.png';
import img1 from '../imagenes/img1.png'; 
import img2 from '../imagenes/img2.png';
import img3 from '../imagenes/img3.png';

export const Home = () => {
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const authenticated = sessionStorage.getItem('authenticated');
    if (authenticated !== 'true') {
      navigate('/');
    }
    
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('authenticated');
    navigate('/');
  };

  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString();

  return (
    <div className="container-fluid d-flex flex-column">
    <div className="row align-items-center bg-light shadow-sm" style={{ height: '110px' }}>
      <div className="col-3 d-flex align-items-center">
        <img src={logo2} className="img-fluid" alt="Logo" />
      </div>
      <div className="col-6 text-center">
        <h2 className="m-0">Blockchain Medicina Forense</h2>
      </div>
      <div className="col-3 d-flex justify-content-end align-items-center">
        <div className="date-time-container">
          <span className="date">{formattedDate}</span>
          <span className="time">{formattedTime}</span>
        </div>
        <div className="menu-container">
          <img
            src={menu}
            alt="Abrir Menú"
            className="menu-icon"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <div className={`menu-dropdown ${menuOpen ? 'menu-open' : 'menu-closed'}`}>
            <div className="d-flex flex-column h-100">
              <div className="p-3 flex-grow-1">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link" href="#!">Gestión de Casos Activos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#!">Consulta de Casos Cerrados</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#!">Centro de Ayuda y Soporte</a>
                  </li>
                </ul>
              </div>
              <div className="p-3 border-top mt-auto">
                <button className="btn btn-primary w-100 logout-btn" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Carrusel */}
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="2000"
      style={{
        marginTop: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="d-block w-100 bg-light text-center p-4" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <h4>Gestión de Casos Forenses</h4>
            <p>Desde aquí puedes gestionar y acceder a la información forense de manera segura y confiable, utilizando la tecnología Blockchain para asegurar la integridad y trazabilidad de los datos.</p>
          </div>
        </div>
        <div className="carousel-item">
          <div className="d-block w-100 bg-light text-center p-4" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <h4>Seguridad de Datos</h4>
            <p>Implementamos tecnologías avanzadas para garantizar la seguridad y privacidad de los datos forenses. Nuestra solución está diseñada para proteger la integridad de la información en todo momento.</p>
          </div>
        </div>
        <div className="carousel-item">
          <div className="d-block w-100 bg-light text-center p-4" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <h4>Acceso Simplificado</h4>
            <p>Accede a la información forense de manera intuitiva y fácil. Nuestra interfaz permite una navegación sencilla, permitiendo a los usuarios encontrar la información que necesitan sin complicaciones.</p>
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

    {/* Módulos principales */}
    <div className="modules-container">
      <div className="module">
        <img src={img1} alt="Gestión de Casos Activos" className="module-image" />
        <h4 className="module-title">Gestión de Casos Activos</h4>
        <p className="module-text">En este módulo, puedes gestionar todos los casos forenses que están actualmente en curso. Revisa el estado de cada caso, actualiza la información y da seguimiento en tiempo real, asegurando la integridad de los datos a través de la tecnología blockchain.</p>
        <button className="btn btn-primary module-btn">Ingresar</button>
      </div>
      <div className="module">
        <img src={img2} alt="Consulta de Casos Cerrados" className="module-image" />
        <h4 className="module-title">Consulta de Casos Cerrados</h4>
        <p className="module-text">Accede a los casos archivados o finalizados. Aquí podrás consultar el historial completo de cada caso, verificando toda la documentación y detalles que fueron gestionados durante el proceso, con la seguridad de que la información está protegida y es inmutable.</p>
        <button className="btn btn-primary module-btn">Ingresar</button>
      </div>
      <div className="module">
        <img src={img3} alt="Centro de Ayuda y Soporte" className="module-image" />
        <h4 className="module-title">Centro de Ayuda y Soporte</h4>
        <p className="module-text">Encuentra manuales de usuario, guías rápidas y respuestas a preguntas frecuentes. Este módulo ofrece asistencia para navegar por la plataforma y aprovechar al máximo sus funcionalidades, con el respaldo de documentación clara y detallada.</p>
        <button className="btn btn-primary module-btn">Ingresar</button>
      </div>
    </div>

    {/* Margen verde al final de la pantalla */}
    <div className="footer-margin"></div>
  </div>
  );
};
