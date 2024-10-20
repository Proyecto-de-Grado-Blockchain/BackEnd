import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Franja from "./Franja";
import menu from "../imagenes/menu.png";
import lupa from "../imagenes/lupa.png";
import Cookies from "js-cookie";

export const CasosActivos = () => {
  const [menu2Open, setMenu2Open] = useState(false);
  const [estadoMenuOpen, setEstadoMenuOpen] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState("");
  const [inputType2, setInputType2] = useState("text");
  const [inputValue2, setInputValue2] = useState("");
  const [casos, setCasos] = useState([]);
  const [showReloadButton, setShowReloadButton] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    if (menu === 2) {
      if (estadoMenuOpen) {
        setEstadoMenuOpen(false);
      } else {
        setMenu2Open(!menu2Open);
      }
    }
  };

  const handleSelectOption = (option, menu) => {
    if (menu === 2) {
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

  const handleChangeInput2 = (e) => {
    const value = e.target.value;
    if (selectedOption2 === "Estado") {
      return;
    } else if (selectedOption2 === "Médico Forense" || selectedOption2 === "Nombre") {
      setInputValue2(value.replace(/[^a-zA-Z ]/g, ""));
    } else if (selectedOption2 === "Número de caso") {
      setInputValue2(value.replace(/[^a-zA-Z0-9]/g, ""));
    } else {
      setInputValue2(value);
    }
  };

  const useHandleBuscar = () => {
    fetch("http://localhost:3100/casos/casos-activos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indicamos que estamos enviando JSON
      },
      body: JSON.stringify({
        // Convertimos el objeto a JSON
        seleccion2: selectedOption2,
        entrada2: inputValue2,
      }),
    })
      .then((response) => {
        // Convertimos el objeto Response a JSON
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json(); // Devuelve una promesa que se resuelve a JSON
      })
      .then((data) => {
        console.log(Array.isArray(data));
        setCasos(data);
        setShowReloadButton(true);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  useEffect(() => {
    // Acción que quieres ejecutar cuando se cargue la página
    fetch("http://localhost:3100/casos/casos-activos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Indicamos que estamos enviando JSON
      },
    })
      .then((response) => {
        // Convertimos el objeto Response a JSON
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json(); // Devuelve una promesa que se resuelve a JSON
      })
      .then((data) => {
        console.log(Array.isArray(data));
        setCasos(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }, []);

  const handleVerDetalle = (numeroCaso) => {
    Cookies.set("numeroCaso", numeroCaso , { expires: 1 }); // Expira en 1 día
    navigate(`/detalle-caso/`);
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
              type={inputType2}
              placeholder={selectedOption2 || "Filtros"}
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
                <button onClick={() => handleSelectOption("Nombre", 2)}>
                  Nombre
                </button>
                <button onClick={() => handleSelectOption("Número de caso", 2)}>
                  Número de caso
                </button>
                <button onClick={() => handleSelectOption("Fecha", 2)}>
                  Fecha
                </button>
                <button onClick={() => handleSelectOption("Médico Forense", 2)}>
                  Médico Forense
                </button>
              </div>
            )}
          </div>
          <div className="search-icon-container">
            <img
              src={lupa}
              alt="Buscar"
              className="search-icon"
              onClick={useHandleBuscar}
            />
          </div>
          {showReloadButton && (
            <div>
              <button
                className="limpiarFiltros"
                onClick={() => window.location.reload()}
              >
                Limpiar Filtros
              </button>
            </div>
          )}
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
                    <td>{caso.numero_caso}</td>
                    <td>{caso.nombre_paciente}</td>
                    <td>{caso.fecha_creacion}</td>
                    <td>{caso.estado}</td>
                    <td>{caso.id_usuario}</td>
                    <td>
                      <Link to="/detalle-casos">
                        <button
                          className="VerDetalle"
                          onClick={() => handleVerDetalle(caso.numero_caso)}
                        >
                          Ver Detalle
                        </button>
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
