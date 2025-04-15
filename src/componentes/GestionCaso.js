import React, { useState } from "react";
import Franja from "./Franja";
import Cookies from "js-cookie";

export const GestionCaso = () => {
  const [nota, setNota] = useState("");
  const dominio = "http://localhost:3100";
  const numeroCaso = Cookies.get("numeroCaso");
  const userId = Cookies.get("userId");
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogErr, setShowDialogErr] = useState(false);

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

  const handleSaveNote = async () => {
    await fetch(`${dominio}/historial/crear-historia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caso: numeroCaso,
        des: nota,
        userId: userId,
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
          window.location.reload();
        }
      });
  };

  /**
   * Manejo de peticion para cerrar caso al backend
   */
  const handleCerrarCaso = () => {
    // Lógica para cerrar el caso con la nota
    fetch(`${dominio}/casos/cerrar-caso`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caso: numeroCaso,
        des: nota,
        responsable: userId,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.json();
    }).then((data) => {
      console.log(data.transactionResponse)
      if (data.transactionResponse) {
        setShowDialog(true); // Muestra el diálogo
        handleSaveNote();
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
      } else if (data.message === "Error al subir el archivo") {
        setShowDialogErr(true); // Muestra el diálogo
        setTimeout(() => {
          setShowDialogErr(false); // Desaparece después de 2 segundos
        }, 2000);
      }
    });
    console.log("Caso cerrado con la nota:", nota);
  };

  return (
    <div>
      <Franja onLogout={() => console.log("Logout clicked")} />

      <div className="gestion-caso-container">
        <h2>Gestión de Caso</h2>
        <p>Por favor, ingresa una última nota antes de cerrar el caso.</p>

        <div className="nota-container">
          <label htmlFor="nota">Nota Final:</label>
          <textarea
            id="nota"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Escribe la última nota aquí..."
            rows="5"
            className="textarea-nota"
          />
        </div>
        <div>
          {showDialog && (
            <div style={dialogStyle}>
              <p>Caso cerrado de manera exitosa.</p>
            </div>
          )}
          {showDialogErr && (
            <div style={dialogStyleErr}>
              <p>Error cerrando el caso.</p>
            </div>
          )}
        </div>
        <button className="boton-cerrar-caso" onClick={handleCerrarCaso}>
          Cerrar Caso
        </button>
      </div>

      <div className="footer-margin"></div>
    </div>
  );
};
