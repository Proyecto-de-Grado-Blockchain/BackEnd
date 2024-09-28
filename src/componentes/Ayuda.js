import React from 'react'
import Franja from './Franja'; 
import ojoA from '../imagenes/ojoA.png';
import upload from '../imagenes/upload.png';
import { Link } from 'react-router-dom';
import manual from '../imagenes/manual.png'; 

export const Ayuda = () => {
  return (
    <div>
    <Franja onLogout={() => console.log('Logout clicked')} />
    

    <div className="casos-detalle-container">
        <h2>Centro de Ayuda y Soporte</h2>
        <p>En el Centro de Ayuda y Soporte, 
          puedes encontrar respuestas a tus preguntas, acceder a recursos 
          Utiles y contactar con nuestro equipo de soporte para obtener
          asistencia personalizada. Explora nuestras guías, tutoriales 
          y preguntas frecuentes para resolver cualquier duda o problema que puedas tener.</p>
      </div>
      <br/><br/>

      <div className="DocumentosExistentes">
        <div className="documento">
          <img src={manual} alt="Gestión de Casos Activos" className="module-image" />
          <h4 className="module-title">Manual Técnico</h4>
          <p>Guía detallada sobre la configuración,  
            mantenimiento y funcionamiento técnico del sistema para administradores y desarrolladores.</p>
          <div className="button-subir">
            <Link to="/subir-doc">
              <button className="btn btn-secondary module-btn">
                <img src={ojoA} alt="Mirar Documento" className="white-image" />
              </button>
            </Link>
          </div>
        </div>

        <div className="documento">
          <img src={manual} alt="Consulta de Casos Cerrados" className="module-image" />
          <h4 className="module-title">Manual de Usuario</h4>
          <p>Instrucciones paso a paso para que los usuarios 
            finales puedan utilizar las funciones y características del sistema de manera eficiente.</p>
          <div className="button-subir">
            <Link to="/subir-doc">
              <button className="btn btn-secondary module-btn">
                <img src={ojoA} alt="Mirar Documento" className="white-image" />
              </button>
            </Link>
          </div>
        </div>
    
    </div> 
    <br/><br/><br/>
    <div className="detalle-margin"></div>
  </div>
  )
}
