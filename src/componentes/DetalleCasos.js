import React, { useState, useEffect } from "react";
import Franja from "./Franja";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import upload from "../imagenes/upload.png";
import lapiz from "../imagenes/lapiz.png";
import Cookies from "js-cookie";

export const DetalleCasos = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogErr, setShowDialogErr] = useState(false);
  const [caso, setCasos] = useState([]);
  const numeroCaso = Cookies.get("numeroCaso");
  const responsableID = Cookies.get("userId");
  const dominio = "http://localhost:3100";
  const [hCaso, setHCasos] = useState([]);

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileChange2 = (event) => {
    setSelectedFile2(event.target.files[0]);
  };

  const handleFileChange3 = (event) => {
    setSelectedFile3(event.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById("hiddenFileInput").click();
  };

  const handleButtonClick2 = () => {
    document.getElementById("hiddenFileInput2").click();
  };

  const handleButtonClick3 = () => {
    document.getElementById("hiddenFileInput3").click();
  };

  const handleSaveNote = async () => {
    const descripcionNota = note;
    console.log("NOTAS " + note)

    await fetch(`${dominio}/historial/crear-historia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caso: numeroCaso,
        des: descripcionNota,
        cookie: responsableID,
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
          console.log(data);
        }
      });
    setModalOpen(false);
  };

  useEffect(() => {
    fetch(`${dominio}/casos/casos-activos?numCaso=${numeroCaso}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        setCasos(data[0]);
        console.log(data[0]);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });

    fetch(`${dominio}/historial/consultar-historia?numCaso=${numeroCaso}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setHCasos(data);
      })
      .catch((err) => {
        console.log("ERROR " + err);
      });
  }, []);

  const cargarArchivo= async (numBoton) => {
    const formData = new FormData();
    if (numBoton === "1" && note === "") {
      formData.append("file", selectedFile);
      formData.append("tipoArchivo", "Informe médico");
      setNote("Se agregaron fotografías al caso.");
      console.log("NOTA BOTON 1 " + note)
    } else if (numBoton === "2") {
      formData.append("file", selectedFile2);
      formData.append("tipoArchivo", "Resultados de laboratorio");
    } else if (numBoton === "3") {
      formData.append("file", selectedFile3);
      formData.append("tipoArchivo", "Fotografías forenses");
      setNote("Se agregaron fotografías al caso.");
    }

    formData.append("numCaso", numeroCaso);
    formData.append("responsable", responsableID);
    try {
      const response = await fetch(`${dominio}/docs/upload`, {
        method: "POST",
        body: formData,
      });
      await response.json().then((data) => {
        console.log(data);
        if (data.transactionResponse) {
          setShowDialog(true); // Muestra el diálogo
          setTimeout(() => {
            setShowDialog(false);
            setSelectedFile(null);
            setSelectedFile2(null);
            setSelectedFile3(null);
            handleSaveNote();
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

  const handleVerDetalle = (estado) => {
    Cookies.set("estado", estado, { expires: 1 }); // Expira en 1 día
    navigate(`/documentos-existentes/`);
  };

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
                  <td style={{ padding: "5px" }}>{caso.numero_caso}</td>
                  <td style={{ padding: "5px" }}>{caso.nombre_paciente}</td>
                  <td style={{ padding: "5px" }}>{caso.fecha_creacion}</td>
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
                  ></th>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>{caso.estado}</td>
                  <td style={{ padding: "5px" }}>{caso.id_usuario}</td>
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
                required
              />

              {/* Botón personalizado que dispara el input file */}
              <button onClick={handleButtonClick} className="boton-principal">
                {selectedFile ? selectedFile.name : "Informe médico"}
              </button>
              <button
                className="boton-upload"
                onClick={() => {
                  cargarArchivo("1");
                  setNote("Se agregó un informe médico al caso.");
                }}
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
                required
              />

              {/* Botón personalizado que dispara el input file */}
              <button onClick={handleButtonClick2} className="boton-principal">
                {selectedFile2
                  ? selectedFile2.name
                  : "Resultados de laboratorio"}
              </button>
              <button
                className="boton-upload"
                onClick={() => {
                  cargarArchivo("2")
                  setNote("Se agregaron resultados de laboratorio al caso.");
                }}
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
                onClick={() => {
                  
                  cargarArchivo("3")
                  console.log(note)
                }}
              >
                <img src={upload} alt="Upload" />
              </button>
            </div>
            <div className="boton-con-upload">
              <button
                onClick={() => {
                  handleVerDetalle("Activo");
                }}
                className="boton-principal"
              >
                Ver documentos existentes
              </button>
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
                <th>Crear notas</th>
              </tr>
            </thead>
            <tbody>
              {hCaso.map((caso, index) => (
                <tr key={index}>
                  <td>{caso.fecha.split("T")[0]}</td>
                  <td>{caso.descripcion}</td>
                  <td>{caso.usuario_responsable}</td>
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
              ))}
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
                required
              />
              <button type="button" onClick={handleSaveNote}>
                Guardar
              </button>
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
