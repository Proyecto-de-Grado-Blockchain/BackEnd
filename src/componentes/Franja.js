import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import logo2 from '../imagenes/logo2.png';
import menu from '../imagenes/menu.png';
import iconoMenu from '../imagenes/iconoMenu.png';
import { useNavigate } from 'react-router-dom';

const Franja = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString();

  const navigate = useNavigate();

  useEffect(() => {
    const authenticated = sessionStorage.getItem('authenticated');
    if (authenticated !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('authenticated');
    navigate('/');
  };

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
              <div className="menu-line"></div>
              <div className="d-flex flex-column h-100">
                <div className="p-3 flex-grow-1">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <Link to="/home" className="nav-link">
                        <img src={iconoMenu} alt="Inicio" className="nav-icon" />
                        <div className="nav-text">
                          <span className="nav-title">Página Principal</span>
                          <span className="nav-description">Página principal del sistema.</span>
                        </div>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/casos-activos" className="nav-link">
                        <img src={iconoMenu} alt="Casos Activos" className="nav-icon" />
                        <div className="nav-text">
                          <span className="nav-title">Casos Activos</span>
                          <span className="nav-description">Lista de casos forenses en curso.</span>
                        </div>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/casos-cerrados" className="nav-link">
                        <img src={iconoMenu} alt="Casos Cerrados" className="nav-icon" />
                        <div className="nav-text">
                          <span className="nav-title">Casos Cerrados</span>
                          <span className="nav-description">Consulta de casos finalizados o archivados.</span>
                        </div>
                      </Link>
                    </li>

                    <li className="nav-item">
                    <Link to="/crear-caso" className="nav-link">
                        <img src={iconoMenu} alt="CrearCaso" className="nav-icon" />
                        <div className="nav-text">
                          <span className="nav-title">Crear Caso</span>
                          <span className="nav-description">Realizar la creación de un nuevo paciente o caso.</span>
                        </div>
                        </Link>
                    </li>

                    <li className="nav-item">
                    <Link to="/agregar-documentos" className="nav-link">
                        <img src={iconoMenu} alt="agregarDoc" className="nav-icon" />
                        <div className="nav-text">
                          <span className="nav-title">Agregar Doccumentos</span>
                          <span className="nav-description">Agregar documentos al caso creado.</span>
                        </div>
                        </Link>
                    </li>

                    <li className="nav-item">
                    <Link to="/centro-ayuda" className="nav-link">
                        <img src={iconoMenu} alt="Ayuda" className="nav-icon" />
                        <div className="nav-text">
                          <span className="nav-title">Ayuda</span>
                          <span className="nav-description">Acceso a manuales de usuario y técnico.</span>
                        </div>
                        </Link>
                    </li>
                  </ul>
                </div>
                  <button className="btn btn-primary w-100 logout-btn" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Franja;
