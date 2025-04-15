import React, { useState, useEffect } from "react";
import Franja from "./Franja";
import foto from "../imagenes/foto.png";
import img2 from "../imagenes/img2.png";
import informe from "../imagenes/informe.png";
import Cookies from "js-cookie";

export const DocumentosExistentes = () => {
  const [caso, setCasos] = useState([]);
  const numeroCaso = Cookies.get("numeroCaso");
  const estado = Cookies.get("estado");
  const idUsuario = Cookies.get("userId");
  const dominio = "http://localhost:3100";
  const [documentos, setDocs] = useState([]);

  useEffect(() => {
    if (estado === "Activo") {
      fetch(`${dominio}/casos/casos-activos?numCaso=${numeroCaso}&userId=${idUsuario}`, {
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
          setCasos(data["transactionResponse"]);
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
        });
    } else {
      fetch(`${dominio}/casos/casos-inactivos?numCaso=${numeroCaso}&userId=${idUsuario}`, {
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
          setCasos(data["transactionResponse"]);
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
        });
    }

    fetch(`${dominio}/docs/obtenerDocumentos?numCaso=${numeroCaso}&userId=${idUsuario}`, {
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
        setDocs(data["transactionResponse"]);
      });
  }, []);

  return (
    <div className="container-casos-detalle">
      <Franja onLogout={() => console.log("Logout clicked")} />

      <div className="casos-detalle-container">
        <h2>Documentos del Caso</h2>
        <p>
          En esta sección puedes acceder a todos los documentos y evidencias
          asociados al caso. Aquí podrás visualizar, descargar y gestionar los
          archivos subidos, asegurando que toda la información esté disponible
          de manera segura y organizada.
        </p>
      </div>
      <br />
      <br />

      <hr />
      <br />
      <div>
        <table className="historial-caso-tabla">
          <thead>
            <tr>
              <th>Número de caso</th>
              <th>Nombre del Paciente</th>
              <th>Forense</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{caso.id}</td>
              <td>{caso.nombrePaciente}</td>
              <td>{caso.usuarioResponsable}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <br />
      <hr />
      <br />

      <div className="DocumentosExistentes">
        <div className="documento">
          <img
            src={informe}
            //src="http://localhost:3100/uploads/1729489526967-Captura%20desde%202024-09-10%2023-53-45.png"
            alt="Gestión de Casos Activos"
            className="module-image"
          />
          <h4 className="module-title">Informe Médico</h4>

          <table className="historial-caso-tabla">
            <tbody>
              {documentos.length > 0 &&
                documentos.map((doc, index) => {
                  if (doc["tipoDocumento"] === "Informe medico") {
                    return (
                      <tr key={index}>
                        <td>
                          <a
                            href={`${dominio}/uploads/${doc["nombreArchivo"]}`}
                            target="_blank"
                          >
                            {doc["nombreArchivo"]}
                          </a>
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>

        <div className="documento">
          <img
            src={img2}
            alt="Consulta de Casos Cerrados"
            className="module-image"
          />
          <h4 className="module-title">Resultados de laboratorio</h4>

          <table className="historial-caso-tabla">
            <tbody>
              {documentos.length > 0 &&
                documentos.map((doc, index) => {
                  if (doc["tipoDocumento"] === "Resultados de laboratorio") {
                    return (
                      <tr key={index}>
                        <td>
                          <a
                            href={`${dominio}/uploads/${doc["nombreArchivo"]}`}
                            target="_blank"
                          >
                            {doc["nombreArchivo"]}
                          </a>
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>

        <div className="documento">
          <img
            src={foto}
            alt="Centro de Ayuda y Soporte"
            className="module-image"
          />
          <h4 className="module-title">Fotografías Forenses</h4>

          <table className="historial-caso-tabla">
            <tbody>
              {documentos.length > 0 &&
                documentos.map((doc, index) => {
                  if (doc["tipoDocumento"] === "Fotografias forenses") {
                    return (
                      <tr key={index}>
                        <td>
                          <a
                            href={`${dominio}/uploads/${doc["nombreArchivo"]}`}
                            target="_blank"
                          >
                            {doc["nombreArchivo"]}
                          </a>
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <div className="footer-margin"></div>
    </div>
  );
};
