import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Franja from "./Franja";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export const CrearCaso = () => {
  const [numeroCaso, setNumeroCaso] = useState("");
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogErr, setShowDialogErr] = useState(false);
  const useID = Cookies.get("userId");
  const dominio = "http://localhost:3100";

  const navigate = useNavigate();
  const dialogStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    backgroundColor: "green",
    color: "white",
    borderRadius: "10px",
    textAlign: "center",
  };

  const dialogStyleErr = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "10px",
    textAlign: "center",
  };

  const handleSubmit = () => {
    if (numeroCaso === "" || nombrePaciente === "") {
      setShowDialogErr(true); // Muestra el diálogo
      setTimeout(() => {
        setShowDialogErr(false); // Desaparece después de 2 segundos
      }, 2000);
    } else {
      fetch(`${dominio}/casos/crear-caso`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paciente: nombrePaciente,
          caso: numeroCaso,
          responsable: useID
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
          }
          return response
            .json()
            .then((data) => ({ status: response.status, data }));
        })
        .then((status, data) => {
          if (status.status === 200) {
            
            setShowDialog(true);
            setTimeout(() => {
              setShowDialog(false);
            }, 2000);
            console.log("Numero" + numeroCaso);
          }
        })
        .catch(() => {
          setShowDialogErr(true);
          setTimeout(() => {
            setShowDialogErr(false);
          }, 2000);
        });
      
    }
  };

  return (
    <div className="container-crearCaso">
      <Franja onLogout={() => console.log("Logout clicked")} />
      <br />
      <br />
      <div className="contenedor-crearCaso">
        <h2>Crear Nuevo Caso</h2>
        <div className="form-group">
          <label htmlFor="numeroCaso">Número del Caso:</label>
          <input
            type="text"
            id="numeroCaso"
            className="input-crearCaso"
            value={numeroCaso}
            onChange={(e) => setNumeroCaso(e.target.value)}
            placeholder="Ingresa el número del caso"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombrePaciente">Nombre del Paciente:</label>
          <input
            type="text"
            id="nombrePaciente"
            className="input-crearCaso"
            value={nombrePaciente}
            onChange={(e) => setNombrePaciente(e.target.value)}
            placeholder="Ingresa el nombre del paciente"
            required
          />
        </div>
        <div>
          {showDialog && (
            <div style={dialogStyle}>
              <p>Caso creado exitosamente</p>
            </div>
          )}
          {showDialogErr && (
            <div style={dialogStyleErr}>
              <p>El número del caso ya existe</p>
            </div>
          )}
        </div>
        <button onClick={handleSubmit} className="btn-crearCaso">
          Crear Caso
        </button>
        <Link to="/agregar-documentos" className="nav-link">
          <button type="button" className="btn-crearCaso">
            Agregar documentos al caso
          </button>
        </Link>
      </div>
      <br />
      <br />
      <br />
      <div className="footer-margin"></div>
    </div>
  );
};
