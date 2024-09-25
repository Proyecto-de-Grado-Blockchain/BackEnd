import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Franja from "./Franja";
import menu from "../imagenes/menu.png";
import lupa from "../imagenes/lupa.png";

export const CasosActivos = () => {
  const [menu1Open, setMenu1Open] = useState(false);
  const [menu2Open, setMenu2Open] = useState(false);
  const [estadoMenuOpen, setEstadoMenuOpen] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [inputType1, setInputType1] = useState("text");
  const [inputType2, setInputType2] = useState("text");
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [estado, setEstado] = useState("");
  const [casos, setCasos] = useState([]);

    const handleUploadClick = () => {
        navigate("/ruta-a-otro-lado"); // Cambia esto a la ruta deseada
    };
    const navigate = useNavigate();

  const toggleMenu = (menu) => {
    if (menu === 1) {
      setMenu1Open(!menu1Open);
    } else if (menu === 2) {
      if (estadoMenuOpen) {
        setEstadoMenuOpen(false);
      } else {
        setMenu2Open(!menu2Open);
      }
    }
  };

  const handleSelectOption = (option, menu) => {
    if (menu === 1) {
      setSelectedOption1(option);
      setInputType1(option === "Fecha" ? "date" : "text");
      setMenu1Open(false);
    } else if (menu === 2) {
      setSelectedOption2(option);
      setInputType2(option === "Fecha" ? "date" : "text");
      if (option === "Estado") {
        setEstadoMenuOpen(true);
      } else {
        setEstadoMenuOpen(false);
        setMenu2Open(false);
      }
    }
  };

  const handleChangeInput1 = (e) => {
    const value = e.target.value;
    if (selectedOption1 === "Nombre") {
      setInputValue1(value.replace(/[^a-zA-Z ]/g, ""));
    } else if (selectedOption1 === "Identificación") {
      setInputValue1(value.replace(/[^a-zA-Z0-9]/g, ""));
    } else {
      setInputValue1(value);
    }
  };

  const handleChangeInput2 = (e) => {
    const value = e.target.value;
    if (selectedOption2 === "Estado") {
      return;
    } else if (selectedOption2 === "Médico Forense") {
      setInputValue2(value.replace(/[^a-zA-Z ]/g, ""));
    } else {
      setInputValue2(value);
    }
  };

  const handleEstadoChange = (value) => {
    setEstado(value);
    setInputValue2(value);
    setEstadoMenuOpen(false);
    setMenu2Open(false);
  };

    const handleBuscar = () => {
        // Resultados simulados
        const resultados = [
            { numero: 1, nombre: 'Juan Pérez', fecha: '2024-09-12', estado: 'Activo', medico: 'Dr. Smith' },
            { numero: 2, nombre: 'Ana López', fecha: '2024-09-10', estado: 'Inactivo', medico: 'Dra. Gómez' },
        ];

        // Filtra los casos por identificación y estado
    const casosFiltrados = resultados.filter((caso) => {
        return (
            (selectedOption1 === 'Identificación' && inputValue1 === '1234') &&
            (selectedOption2 === 'Estado' && estado === 'Activo')
        );
    });

    setCasos(casosFiltrados);
    };

  const handleVerDetalle = (numeroCaso) => {
    navigate(`/detalle-caso/${numeroCaso}`);
  };

  return (
    <div className="container-activos">
      <Franja onLogout={() => console.log("Logout clicked")} />

      <div className="content">
        <div className="casos-activos-container">
          <h2>Gestión de Casos Activos</h2>
          <p>
            En esta sección, puedes ver y gestionar todos los casos forenses que
            están actualmente en curso. Filtra y accede a cada caso para obtener
            información detallada, realizar actualizaciones, asignar
            responsabilidades o cambiar el estado de cada proceso.
          </p>
        </div>

                {/* Inputs con íconos */}
                <div className="input-container">
                    <div className="input-wrapper">
                        <input 
                            type={inputType1} 
                            placeholder={selectedOption1 || 'Nombre o Identificación'} 
                            value={inputValue1}
                            onChange={handleChangeInput1}
                            disabled={!selectedOption1}
                        />
                        <div className="input-icons">
                            <img 
                                src={menu} 
                                alt="Menu" 
                                className="menu-icon-input" 
                                onClick={() => toggleMenu(1)} 
                            />
                        </div>
                        {menu1Open && (
                            <div className="dropdown-menu">
                                <button onClick={() => handleSelectOption('Nombre', 1)}>Nombre</button>
                                <button onClick={() => handleSelectOption('Identificación', 1)}>Número de caso</button>
                            </div>
                        )}
                    </div>

          <div className="search-icon-container">
            <img
              src={lupa}
              alt="Buscar"
              className="search-icon"
              onClick={handleBuscar}
            />
          </div>

          <div className="input-wrapper">
            <input
              type={inputType2}
              placeholder={selectedOption2 || "Estado, Fecha o Médico Forense"}
              value={inputValue2}
              onChange={handleChangeInput2}
              disabled={!selectedOption2}
            />
            <div className="input-icons">
              <img
                src={menu}
                alt="Menu"
                className="menu-icon-input"
                onClick={() => toggleMenu(2)}
              />
            </div>
            {menu2Open && (
              <div className="dropdown-menu">
                <button onClick={() => handleSelectOption("Estado", 2)}>
                  Estado
                </button>
                <button onClick={() => handleSelectOption("Fecha", 2)}>
                  Fecha
                </button>
                <button onClick={() => handleSelectOption("Médico Forense", 2)}>
                  Médico Forense
                </button>

                {estadoMenuOpen && selectedOption2 === "Estado" && (
                  <div className="estado-options">
                    <label>
                      <input
                        type="radio"
                        name="estado"
                        value="Activo"
                        checked={estado === "Activo"}
                        onChange={() => handleEstadoChange("Activo")}
                      />
                      Activo
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="estado"
                        value="Inactivo"
                        checked={estado === "Inactivo"}
                        onChange={() => handleEstadoChange("Inactivo")}
                      />
                      Inactivo
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

                {/* Tabla de resultados */}
                {casos.length > 0 && (
                    <div className="tabla-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Número de Caso</th>
                                    <th>Nombre del Paciente</th>
                                    <th>Fecha de Creación</th>
                                    <th>Estado del Caso</th>
                                    <th>Médico Forense</th>
                                    <th>Ver Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {casos.map((caso, index) => (
                                    <tr key={index}>
                                        <td>{caso.numero}</td>
                                        <td>{caso.nombre}</td>
                                        <td>{caso.fecha}</td>
                                        <td>{caso.estado}</td>
                                        <td>{caso.medico}</td>
                                        <td>
                                        <Link to="/detalle-casos">
                                            <button className='VerDetalle' onClick={() => handleVerDetalle(caso.numero)}>Ver Detalle</button>
                                        </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

      <div className="activos-margin"></div>
    </div>
  );
};
