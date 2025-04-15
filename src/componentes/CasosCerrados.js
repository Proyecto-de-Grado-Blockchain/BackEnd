import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Franja from "./Franja";
import menu from "../imagenes/menu.png";
import lupa from "../imagenes/lupa.png";
import Cookies from "js-cookie";

export const CasosCerrados = () => {
  const [menu2Open, setMenu2Open] = useState(false);
  const [estadoMenuOpen, setEstadoMenuOpen] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState("");
  const [inputType2, setInputType2] = useState("text");
  const [inputValue2, setInputValue2] = useState("");
  const [casos, setCasos] = useState([]);
  const [showReloadButton, setShowReloadButton] = useState(false);
  const dominio = "http://localhost:3100";
  const navigate = useNavigate();
  const idUsuario = Cookies.get("userId");

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
    } else if (selectedOption2 === "Médico Forense") {
      setInputValue2(value.replace(/[^a-zA-Z ]/g, ""));
    } else if (selectedOption2 === "Nombre") {
      setInputValue2(value.replace(/[^a-zA-Z ]/g, ""));
    } else if (selectedOption2 === "Identificación") {
      setInputValue2(value.replace(/[^0-9]/g, ""));
    } else {
      setInputValue2(value);
    }
  };

  const useHandleBuscar = () => {
    fetch("http://localhost:3100/casos/casos-inactivos", {
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
    fetch(`${dominio}/casos/casos-inactivos?userId=${idUsuario}`, {
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
        console.log(data.transactionResponse);
        setCasos(data.transactionResponse);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });

    // Puedes ejecutar cualquier otra lógica aquí
  }, []);

  const handleVerDetalle = (numeroCaso) => {
    Cookies.set("numeroCaso", numeroCaso , { expires: 1 }); // Expira en 1 día
    navigate(`/detalle-caso`);
  };

  return (
    <div className="container-activos">
      <Franja onLogout={() => console.log("Logout clicked")} />

      <div className="content">
        <div className="casos-activos-container">
          <h2>Gestión de Casos Cerrados</h2>
          <p>
            En esta sección, puedes ver y gestionar todos los forenses que han
            sido cerrados. Filtra y accede a cada caso para obtener información
            detallada, revisar actualizaciones, verificar responsabilidades o
            consultar el estado final de cada proceso.
          </p>
        </div>

        {/* Inputs con íconos */}
        <div className="input-container">
          <div className="input-wrapper">
            <input
              type={inputType2}
              placeholder={
                selectedOption2 ||
                "Filtros"
              }
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
                <button onClick={() => handleSelectOption("Identificación", 2)}>
                  Identificación
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
                    <td>{caso.id}</td>
                    <td>{caso.nombrePaciente}</td>
                    <td>{caso.fechaCreacion}</td>
                    <td>{caso.estado}</td>
                    <td>{caso.idUsuario}</td>
                    <td>
                      <Link to="/detalle-casosCerrados">
                        <button
                          className="VerDetalle"
                          onClick={() => handleVerDetalle(caso.id)}
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

      <div className="footer-margin"></div>
    </div>
  );
};
