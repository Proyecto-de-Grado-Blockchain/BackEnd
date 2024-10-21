import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Franja from "./Franja";
import { Link } from "react-router-dom";
import lupa from "../imagenes/lupa.png";
import doc from "../imagenes/doc.png";
import Cookies from "js-cookie";

export const DetalleCasosCerrados = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [caso, setCasos] = useState([]);
  const numeroCaso = Cookies.get("numeroCaso");
  const responsableID = Cookies.get("userId");
  const [hCaso, setHCasos] = useState([]);

  const handleUploadClick = () => {
    //navigate("/ruta-a-otro-lado"); // Cambia esto a la ruta deseada
  };

  const navigate = useNavigate();

  const handleSaveNote = () => {
    setNotes([...notes, note]);
    setModalOpen(false);
    setNote(""); // Limpia el input después de guardar
  };

  useEffect(() => {
    fetch(`http://localhost:3100/casos/casos-inactivos?numCaso=${numeroCaso}`, {
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

    fetch(
      `http://localhost:3100/historial/consultar-historia?numCaso=${numeroCaso}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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

  const handleVerDetalle = (estado) => {
    Cookies.set("estado", estado, { expires: 1 }); // Expira en 1 día
    navigate(`/documentos-existentes/`);
  };

  return (
    <div className="container-casos-detalle">
      <Franja onLogout={() => console.log("Logout clicked")} />

      <div className="content-detalle">
        <div className="casos-detalle-container">
          <h2>Detalle del caso Cerrado</h2>
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
              <button
                onClick={() => {
                  handleVerDetalle("Inactivo");
                }}
                className="boton-principal"
              >
                Ver documentos existentes
              </button>
              <button className="boton-upload" onClick={handleUploadClick}>
                <img src={doc} alt="Document Upload" />
              </button>
            </div>
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
              </tr>
            </thead>
            <tbody>
              {hCaso.map((caso, index) => (
                <tr key={index}>
                  <td>{caso.fecha.split("T")[0]}</td>
                  <td>{caso.descripcion}</td>
                  <td>{caso.usuario_responsable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="footer-margin"></div>
    </div>
  );
};
