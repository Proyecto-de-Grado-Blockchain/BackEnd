import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Franja from './Franja';
import { Link } from 'react-router-dom';

export const CrearCaso = () => {
  const [numeroCaso, setNumeroCaso] = useState('');
  const [nombrePaciente, setNombrePaciente] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de datos, por ejemplo, enviar los datos a tu API
    console.log('Número del caso:', numeroCaso);
    console.log('Nombre del paciente:', nombrePaciente);
    // Redirigir a otra página si es necesario
    navigate('/casos');
  };

  return (
    <div className="container-crearCaso">
      <Franja onLogout={() => console.log('Logout clicked')} />
        <br/><br/>
        <div className="contenedor-crearCaso">
      <h2>Crear Nuevo Caso</h2>
      <form onSubmit={handleSubmit} className="form-crearCaso">
        <div className="form-group">
          <label htmlFor="numeroCaso">Número del Caso:</label>
          <input
            type="text"
            id="numeroCaso"
            value={numeroCaso}
            onChange={(e) => setNumeroCaso(e.target.value)}
            placeholder="Ingresa el número del caso"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombrePaciente">Nombre del Paciente:</label>
          <input
            type="text"
            id="nombrePaciente"
            value={nombrePaciente}
            onChange={(e) => setNombrePaciente(e.target.value)}
            placeholder="Ingresa el nombre del paciente"
            required
          />
        </div>
        <button type="submit" className="btn-crearCaso">Crear Caso</button>
        <br/>
        <Link to="/agregar-documentos" className="nav-link">
        <button type="button" className="btn-crearCaso">Agregar documentos al caso</button>
        </Link>
      </form>

      </div>
    </div>
  );
};
