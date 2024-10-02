import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Franja from './Franja'; 
import { Link } from 'react-router-dom';
import lupa from '../imagenes/lupa.png'; 
import doc from '../imagenes/doc.png'; 

export const DetalleCasosCerrados = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);
    
    const caso = {
        numero: 1,
        nombre: 'Ana Martinez',
        fecha: '2023-09-04',
        estado: 'Inactivo',
        forense: 'Jonathan Angulo',
        ultimaActualizacion: '2023-09-04',
    };

    const handleUploadClick = () => {
        navigate('/ruta-a-otro-lado'); // Cambia esto a la ruta deseada
    };

    const navigate = useNavigate(); 

    const handleSaveNote = () => {
        setNotes([...notes, note]);
        setModalOpen(false);
        setNote(''); // Limpia el input después de guardar
    };

    return (
        <div className="container-casos-detalle">
            <Franja onLogout={() => console.log('Logout clicked')} />
                
            <div className="content-detalle">
                <div className="casos-detalle-container">
                    <h2>Detalle del caso Cerrado</h2>
                    <p>En esta sección, puedes visualizar toda la información detallada sobre el caso forense seleccionado.
                        Aquí puedes revisar la documentación, agregar nuevas actualizaciones, cambiar el estado del caso y consultar
                        el historial de actividades para asegurar un seguimiento completo y transparente.</p>
                </div>
                <br/>
                <div className="detalle-caso-container">
                    <div className="detalle-caso-tabla">
                        <table>
                            <tbody>
                                <tr>
                                    <th style={{ borderBottom: '1px solid black', padding: '5px', width: '30%' }}>Número de Caso</th>
                                    <th style={{ borderBottom: '1px solid black', padding: '5px', width: '35%' }}>Nombre del Paciente</th>
                                    <th style={{ borderBottom: '1px solid black', padding: '5px', width: '35%' }}>Fecha de Creación</th>
                                </tr>
                                <tr>
                                    <td style={{ padding: '5px' }}>{caso.numero}</td>
                                    <td style={{ padding: '5px' }}>{caso.nombre}</td>
                                    <td style={{ padding: '5px' }}>{caso.fecha}</td>
                                </tr>
                                <tr>
                                    <th style={{ borderBottom: '1px solid black', padding: '5px' }}>Estado del Caso</th>
                                    <th style={{ borderBottom: '1px solid black', padding: '5px' }}>Forense</th>
                                    <th style={{ borderBottom: '1px solid black', padding: '5px' }}>Última Actualización</th>
                                </tr>
                                <tr>
                                    <td style={{ padding: '5px' }}>{caso.estado}</td>
                                    <td style={{ padding: '5px' }}>{caso.forense}</td>
                                    <td style={{ padding: '5px' }}>{caso.ultimaActualizacion}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="detalle-caso-botones">
                        <div className="boton-con-upload">
                            <Link to="/documentos-existentes">
                                <button className="boton-principal">Ver documentos existentes</button>
                            </Link>
                            <button className="boton-upload" onClick={handleUploadClick}>
                                <img src={doc} alt="Document Upload" />
                            </button>
                        </div>
                    </div>
                </div>
                <br/>
                <hr/>   

                <div className="historial-caso-container">
                    <br/>
                    <div className="input-boton-container">
                        <h4>Historial del caso</h4>
                        <div className="buscar-container">
                            <input type="text" placeholder="Buscar..." />
                            <button className="buscar-boton">
                                <img src={lupa} alt="Buscar" />
                            </button>
                        </div>
                    </div>
                    <br/>
                    <table className="historial-caso-tabla">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Descripción de la acción realizada</th>
                                <th>Usuario responsable</th>
                                <th>Notas Adjuntas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2024-09-01</td>
                                <td>Se creó el caso.</td>
                                <td>Jonathan Angulo</td>
                                <td>Nota 1</td>
                            </tr>           
                        </tbody>
                    </table>
                </div>
            </div>
            <br /><br /><br /><br /><br />
            <div className="detalle-margin"></div> 
        </div>
    );
};
