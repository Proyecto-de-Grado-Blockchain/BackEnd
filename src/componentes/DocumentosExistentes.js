import React from 'react';
import Franja from './Franja'; 
import { Link } from 'react-router-dom';
import foto from '../imagenes/foto.png'; 
import img2 from '../imagenes/img2.png';
import informe from '../imagenes/informe.png';
import ojoA from '../imagenes/ojoA.png';
import upload from '../imagenes/upload.png';

export const DocumentosExistentes = () => {
  return (
    <div className="container-casos-detalle">
      <Franja onLogout={() => console.log('Logout clicked')} />

      <div className="casos-detalle-container">
        <h2>Documentos del Caso</h2>
        <p>En esta sección puedes acceder a todos los documentos y 
          evidencias asociados al caso. Aquí podrás visualizar, descargar 
          y gestionar los archivos subidos, asegurando que toda la
          información esté disponible de manera segura y organizada.</p>
      </div>
      <br/><br/>

      <hr/><br/>
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
              <td>CASO005</td>
              <td>Ana Martinez</td>
              <td>Jonathan Angulo</td>
            </tr>           
          </tbody>
        </table>
      </div>

      <br/><hr/><br/>

      <div className="DocumentosExistentes">
        <div className="documento">
          <img src={informe} alt="Gestión de Casos Activos" className="module-image" />
          <h4 className="module-title">Informe Médico</h4>
          
          <table className="document-table small-table">
            <tbody>
            </tbody>
          </table>
        </div>

        <div className="documento">
          <img src={img2} alt="Consulta de Casos Cerrados" className="module-image" />
          <h4 className="module-title">Resultados de laboratorio</h4>
          
          <table className="document-table small-table">
            <tbody>
              
            </tbody>
          </table>
        </div>

        <div className="documento">
          <img src={foto} alt="Centro de Ayuda y Soporte" className="module-image" />
          <h4 className="module-title">Fotografías Forenses</h4>
          
          <table className="document-table small-table">
            <tbody>
            </tbody>
          </table>
        </div>
      </div>

      <br/><br/><br/><br/>
      <div className="detalle-margin"></div>
    </div>
  );
};
