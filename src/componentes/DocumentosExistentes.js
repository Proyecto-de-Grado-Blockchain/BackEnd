import React from 'react'
import Franja from './Franja'; 
import { Link } from 'react-router-dom';

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
                                <td>oscar</td>
                            </tr>           
                        </tbody>
                    </table>
                </div>
    </div>
  )
}
