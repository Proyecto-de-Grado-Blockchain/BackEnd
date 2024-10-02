import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Franja from "./Franja";
import { Link } from "react-router-dom";
import upload from "../imagenes/upload.png";
import lupa from "../imagenes/lupa.png";
import lapiz from "../imagenes/lapiz.png";

export const DetalleCasos = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  // Estado para almacenar el archivo seleccionado
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
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

  // Manejador cuando se selecciona un archivo
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Guardar el archivo en el estado
  };

  const handleFileChange2 = (event) => {
    setSelectedFile2(event.target.files[0]); // Guardar el archivo en el estado
  };

  const handleFileChange3 = (event) => {
    setSelectedFile3(event.target.files[0]); // Guardar el archivo en el estado
  };

  // Manejador para disparar el clic en el input file oculto
  const handleButtonClick = () => {
    document.getElementById("hiddenFileInput").click(); // Simular clic en el input file
  };

  const handleButtonClick2 = () => {
    document.getElementById("hiddenFileInput2").click(); // Simular clic en el input file
  };

  const handleButtonClick3 = () => {
    document.getElementById("hiddenFileInput3").click(); // Simular clic en el input file
  };

  const caso = {
    numero: "CASO013",
    nombre: "Carlos Mora",
    fecha: "2024-10-01",
    estado: "Activo",
    forense: "Oscar Florez",
    ultimaActualizacion: "2024-10-01",
  };

  const navigate = useNavigate();

  const handleSaveNote = () => {
    setNotes([...notes, note]);
    setModalOpen(false);
    setNote(""); // Limpia el input después de guardar
  };

  async function cargarArchivo(numBoton) {
    const formData = new FormData();
    if (numBoton === "1") {
      formData.append("file", selectedFile);
    } else if (numBoton === "2") {
      formData.append("file", selectedFile2);
    } else if (numBoton === "3") {
      formData.append("file", selectedFile3);
    }

    try {
      const response = await fetch("http://localhost:3100/docs/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().then((data) => {
        console.log(data);
        if (data.transactionResponse) {
          setShowDialog(true); // Muestra el diálogo
          setTimeout(() => {
            setShowDialog(false);
            setSelectedFile(null);
            setSelectedFile2(null);
            setSelectedFile3(null);
          }, 2000);
        } else if (data.message === "Error al subir el archivo") {
          setShowDialogErr(true); // Muestra el diálogo
          setTimeout(() => {
            setShowDialogErr(false); // Desaparece después de 2 segundos
          }, 2000);
        }
      });
    } catch (error) {
      console.error("Error al subir el archivo:", error);
    }
  }

  return (
    <div className="container-casos-detalle">
      <Franja onLogout={() => console.log("Logout clicked")} />

      <div className="content-detalle">
        <div className="casos-detalle-container">
          <h2>Detalle del caso Activo</h2>
          <p>
            En esta sección, puedes visualizar toda la información detallada
            sobre el caso forense seleccionado. Aquí puedes revisar la
            documentación, agregar nuevas actualizaciones, cambiar el estado del
            caso y consultar el historial de actividades para asegurar un
            seguimiento completo y transparente.
          </p>
        </div>
        <br />
        <div className="detalle-caso-container">
          <div className="detalle-caso-tabla">
            <table>
              <tbody>
                <tr>
                  <th
                    style={{
                      borderBottom: "1px solid black",
                      padding: "5px",
                      width: "30%",
                    }}
                  >
                    Número de Caso
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid black",
                      padding: "5px",
                      width: "35%",
                    }}
                  >
                    Nombre del Paciente
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid black",
                      padding: "5px",
                      width: "35%",
                    }}
                  >
                    Fecha de Creación
                  </th>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>{caso.numero}</td>
                  <td style={{ padding: "5px" }}>{caso.nombre}</td>
                  <td style={{ padding: "5px" }}>{caso.fecha}</td>
                </tr>
                <tr>
                  <th
                    style={{ borderBottom: "1px solid black", padding: "5px" }}
                  >
                    Estado del Caso
                  </th>
                  <th
                    style={{ borderBottom: "1px solid black", padding: "5px" }}
                  >
                    Forense
                  </th>
                  <th
                    style={{ borderBottom: "1px solid black", padding: "5px" }}
                  >
                    Última Actualización
                  </th>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>{caso.estado}</td>
                  <td style={{ padding: "5px" }}>{caso.forense}</td>
                  <td style={{ padding: "5px" }}>{caso.ultimaActualizacion}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="detalle-caso-botones">
            <div className="boton-con-upload">
              {/* Input de tipo file oculto */}
              <input
                id="hiddenFileInput"
                type="file"
                style={{ display: "none" }} // Ocultamos el input
                onChange={handleFileChange}
              />

              {/* Botón personalizado que dispara el input file */}
              <button onClick={handleButtonClick} className="boton-principal">
                {selectedFile ? selectedFile.name : "Informe médico"}
              </button>
              <button
                className="boton-upload"
                onClick={() => cargarArchivo("1")}
              >
                <img src={upload} alt="Upload" />
              </button>
            </div>
            <div className="boton-con-upload">
              {/* Input de tipo file oculto */}
              <input
                id="hiddenFileInput2"
                type="file"
                style={{ display: "none" }} // Ocultamos el input
                onChange={handleFileChange2}
              />

              {/* Botón personalizado que dispara el input file */}
              <button onClick={handleButtonClick2} className="boton-principal">
                {selectedFile2
                  ? selectedFile2.name
                  : "Resultados de laboratorio"}
              </button>
              <button
                className="boton-upload"
                onClick={() => cargarArchivo("2")}
              >
                <img src={upload} alt="Upload" />
              </button>
            </div>
            <div className="boton-con-upload">
              {/* Input de tipo file oculto */}
              <input
                id="hiddenFileInput3"
                type="file"
                style={{ display: "none" }} // Ocultamos el input
                onChange={handleFileChange3}
              />

              {/* Botón personalizado que dispara el input file */}
              <button onClick={handleButtonClick3} className="boton-principal">
                {selectedFile3 ? selectedFile3.name : "Fotografías forenses"}
              </button>
              <button
                className="boton-upload"
                onClick={() => cargarArchivo("3")}
              >
                <img src={upload} alt="Upload" />
              </button>
            </div>
            <div className="boton-con-upload">
              <Link to="/documentos-existentes">
                <button className="boton-principal">
                  Ver documentos existentes
                </button>
              </Link>
            </div>
          </div>
          <div>
            {showDialog && (
              <div style={dialogStyle}>
                <p>Archivo enviado a la red blockchain de manera exitosa</p>
              </div>
            )}
            {showDialogErr && (
              <div style={dialogStyleErr}>
                <p>Error enviado archivo a la red blockchain</p>
              </div>
            )}
          </div>
        </div>
        <br />
        <hr />

        <div className="historial-caso-container">
          <br />
          <div className="input-boton-container">
            <h4>Historial del caso</h4>
          </div>
          <br />
          <table className="historial-caso-tabla">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción de la acción realizada</th>
                <th>Usuario responsable</th>
                <th>Notas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-10-01</td>
                <td>Se creó el caso.</td>
                <td>Oscar Florez</td>
                <td>
                  <button
                    onClick={() => setModalOpen(true)}
                    style={{
                      backgroundColor: "rgba(134, 193, 39, 1)",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  >
                    <img
                      src={lapiz}
                      alt="Editar Nota"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Ventana emergente para agregar notas */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button
                className="close-button"
                onClick={() => setModalOpen(false)}
              >
                ✖
              </button>
              <h4>Añadir Nota</h4>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Escribe tu nota aquí..."
              />
              <button onClick={handleSaveNote}>Guardar</button>
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="detalle-margin"></div>
    </div>
  );
};
