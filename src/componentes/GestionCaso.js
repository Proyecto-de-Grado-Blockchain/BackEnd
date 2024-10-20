import React, { useState } from 'react';
import Franja from './Franja';

export const GestionCaso = () => {
  const [nota, setNota] = useState('');

  const handleCerrarCaso = () => {
    // Lógica para cerrar el caso con la nota
    console.log("Caso cerrado con la nota:", nota);
  };

  return (
    <div>
      <Franja onLogout={() => console.log('Logout clicked')} />

      <div className="gestion-caso-container">
        <h2>Gestión de Caso</h2>
        <p>Por favor, ingresa una última nota antes de cerrar el caso.</p>

        <div className="nota-container">
          <label htmlFor="nota">Nota Final:</label>
          <textarea 
            id="nota"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Escribe la última nota aquí..."
            rows="5"
            className="textarea-nota"
          />
        </div>

        <button className="boton-cerrar-caso" onClick={handleCerrarCaso}>Cerrar Caso</button>
      </div>

      <div className="footer-margin"></div>
    </div>
  );
};
