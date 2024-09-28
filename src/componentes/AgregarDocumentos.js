import React, { useState } from 'react';
import Franja from './Franja'; 
import { Link } from 'react-router-dom';
import foto from '../imagenes/foto.png'; 
import img2 from '../imagenes/img2.png';
import informe from '../imagenes/informe.png';
import upload from '../imagenes/upload.png';

export const AgregarDocumentos = () => {
  const [numeroCaso, setNumeroCaso] = useState('');

  const handleNumeroCasoChange = (e) => {
    setNumeroCaso(e.target.value);
  };

  return (
    <div className="container-casos-detalle">
      <Franja onLogout={() => console.log('Logout clicked')} />

      <div className="casos-detalle-container">
        <h2>Agregar Documentos al Caso</h2>
        <p className="p">En esta sección puedes agregar nuevos documentos al caso.</p>

        {/* Input para el número del caso */}
        <div className="numero-caso-input">
          <label htmlFor="numeroCaso">Número del Caso:</label>
          <input
            type="text"
            id="numeroCaso"
            value={numeroCaso}
            onChange={handleNumeroCasoChange}
            placeholder="Ingresa el número del caso"
            required
          />
        </div>
      </div>
      <br/><br/>
      <hr/><br/>

      <div className="DocumentosExistentes">
        <div className="documento">
          <img src={informe} alt="Gestión de Casos Activos" className="module-image" />
          <h4 className="module-title">Informe Médico</h4>
          <div className="button-subir">
            <Link to="/subir-doc">
              <button
                className="btn btn-secondary module-btn"
                disabled={!numeroCaso}>
                <img src={upload} alt="Subir Documento" className="white-image" />
              </button>
            </Link>
          </div>
        </div>

        <div className="documento">
          <img src={img2} alt="Consulta de Casos Cerrados" className="module-image" />
          <h4 className="module-title">Resultados de laboratorio</h4>
          <div className="button-subir">
            <Link to="/subir-doc">
              <button
                className="btn btn-secondary module-btn"
                disabled={!numeroCaso} /* Deshabilitar si no hay número de caso */
              >
                <img src={upload} alt="Subir Documento" className="white-image" />
              </button>
            </Link>
          </div>
        </div>

        <div className="documento">
          <img src={foto} alt="Centro de Ayuda y Soporte" className="module-image" />
          <h4 className="module-title">Fotografías Forenses</h4>

          <div className="button-subir">
            <Link to="/subir-doc">
              <button
                className="btn btn-secondary module-btn"
                disabled={!numeroCaso} /* Deshabilitar si no hay número de caso */
              >
                <img src={upload} alt="Subir Documento" className="white-image" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <br/><br/><br/><br/>
      
      <div className="detalle-margin"></div>
    </div>
  );
};
