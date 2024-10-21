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
  const dominio = "http://localhost:3100";

  useEffect(() => {
    if (estado === "Activo") {
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
    } else {
      fetch(`${dominio}/casos/casos-inactivos?numCaso=${numeroCaso}`, {
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
    }
    fetch(`${dominio}/casos/obtenerDocumentos?numCaso=${numeroCaso}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.json();
    }).then((data) => {
      console.log(data[0]);
    })
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
              <td>{caso.numero_caso}</td>
              <td>{caso.nombre_paciente}</td>
              <td>{caso.id_usuario}</td>
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
            alt="Gestión de Casos Activos"
            className="module-image"
          />
          <h4 className="module-title">Informe Médico</h4>

          <table className="document-table small-table">
            <tbody>
              <tr>{/*Ciclo de los documentos del caso*/}</tr>
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

          <table className="document-table small-table">
            <tbody>
              <tr>{/*Ciclo de los documentos del caso*/}</tr>
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

          <table className="document-table small-table">
            <tbody>
              <tr>{/*Ciclo de los documentos del caso*/}</tr>
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
