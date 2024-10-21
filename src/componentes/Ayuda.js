import React from "react";
import Franja from "./Franja";
import ojoA from "../imagenes/ojoA.png";
import upload from "../imagenes/upload.png";
import { Link } from "react-router-dom";
import manual from "../imagenes/manual.png";

export const Ayuda = () => {
  const documentUrl =
    "ManualAppWeb.pdf";

  return (
    <div>
      <Franja onLogout={() => console.log("Logout clicked")} />

      <div className="casos-detalle-container">
        <h2>Centro de Ayuda y Soporte</h2>
        <p>
        Aquí encontrarás el manual de la applicación, específico para cada usuario o rol.
        </p>
      </div>
      <br />
      <br />

      <div className="DocumentosExistentes">
        <div className="documento">
          <img
            src={manual}
            alt="Consulta de Casos Cerrados"
            className="module-image"
          />
          <h4 className="module-title">Manual de Usuario</h4>
          <p>
              Instrucciones paso a paso para que los usuarios finales puedan
              utilizar las funciones y características del sistema de manera
              eficiente.
          </p>
          <iframe
            src={documentUrl}
            title="Manual de Usuario"
            width="100%"
            height="600px"
            style={{ border: "none" }}
          ></iframe>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="footer-margin"></div>
    </div>
  );
};
