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
              <td>00001</td>
              <td>Jorge</td>
              <td>Oscar</td>
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
              <tr>
                <td>Tipo de documento:</td>
                <td>Informe Médico</td>
              </tr>
              <tr>
                <td>Fecha de Subida:</td>
                <td>2024-09-20</td>
              </tr>
              <tr>
                <td>Tamaño del archivo:</td>
                <td>1.5 MB</td>
              </tr>
              <tr>
                <td>Subido por:</td>
                <td>Usuario A</td>
              </tr>
            </tbody>
          </table>

          <div className="button-container">
            <Link to="/visualizar-doc">
              <button className="btn btn-secondary module-btn">
                <img src={upload} alt="Visualizar Documento" />
              </button>
            </Link>
            <Link to="/subir-doc">
              <button className="btn btn-secondary module-btn">
                <img src={ojoA} alt="Subir Documento" className="white-image" />
              </button>
            </Link>
          </div>
        </div>

        <div className="documento">
          <img src={img2} alt="Consulta de Casos Cerrados" className="module-image" />
          <h4 className="module-title">Resultados de laboratorio</h4>
          
          <table className="document-table small-table">
            <tbody>
              <tr>
                <td>Tipo de documento:</td>
                <td>Resultados de laboratorio</td>
              </tr>
              <tr>
                <td>Fecha de Subida:</td>
                <td>2024-09-18</td>
              </tr>
              <tr>
                <td>Tamaño del archivo:</td>
                <td>2.3 MB</td>
              </tr>
              <tr>
                <td>Subido por:</td>
                <td>Usuario B</td>
              </tr>
            </tbody>
          </table>

          <div className="button-container">
            <Link to="/visualizar-doc">
              <button className="btn btn-secondary module-btn">
                <img src={upload} alt="Visualizar Documento" />
              </button>
            </Link>
            <Link to="/subir-doc">
              <button className="btn btn-secondary module-btn">
                <img src={ojoA} alt="Subir Documento" className="white-image" />
              </button>
            </Link>
          </div>
        </div>

        <div className="documento">
          <img src={foto} alt="Centro de Ayuda y Soporte" className="module-image" />
          <h4 className="module-title">Fotografías Forenses</h4>
          
          <table className="document-table small-table">
            <tbody>
              <tr>
                <td>Tipo de documento:</td>
                <td>Fotografías Forenses</td>
              </tr>
              <tr>
                <td>Fecha de Subida:</td>
                <td>2024-09-15</td>
              </tr>
              <tr>
                <td>Tamaño del archivo:</td>
                <td>5.0 MB</td>
              </tr>
              <tr>
                <td>Subido por:</td>
                <td>Usuario C</td>
              </tr>
            </tbody>
          </table>

          <div className="button-container">
            <Link to="/visualizar-doc">
              <button className="btn btn-secondary module-btn">
                <img src={upload} alt="Visualizar Documento" />
              </button>
            </Link>
            <Link to="/subir-doc">
              <button className="btn btn-secondary module-btn">
                <img src={ojoA} alt="Subir Documento" className="white-image" />
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
