import React, { useState } from 'react';
import Franja from './Franja'; 

export const CrearUsuario = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleNombreUsuarioChange = (e) => {
    setNombreUsuario(e.target.value);
  };

  const handleTipoUsuarioChange = (e) => {
    setTipoUsuario(e.target.value);
  };

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };

  const handleCrearUsuario = () => {

    fetch("http://localhost:3100/usuarios/CrearUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        des: "Se creó el usuario.",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response
          .json()
          .then((data) => ({ status: response.status, data }));
      })

  };

  return (
    <div>
      <Franja onLogout={() => console.log('Logout clicked')} />
      <div className="contenedor-crearUsuario">
      <h2>Crear Nuevo Usuario</h2>
      <p>Llena la información para registrar un nuevo usuario.</p>

      <div className="form-crearUsuario">
        {/* Input para el nombre del usuario */}
        <div className="form-group">
          <label htmlFor="nombreUsuario">Nombre del Usuario:</label>
          <input
            type="text"
            id="nombreUsuario"
            value={nombreUsuario}
            onChange={handleNombreUsuarioChange}
            placeholder="Ingresa el nombre del usuario"
            className="input-crearUsuario"
            required
          />
        </div>

        {/* Input para seleccionar el tipo de usuario */}
        <div className="form-group">
          <label htmlFor="tipoUsuario">Tipo de Usuario:</label>
          <select
            id="tipoUsuario"
            value={tipoUsuario}
            onChange={handleTipoUsuarioChange}
            className="input-crearUsuario"
            required
          >
            <option value="">Selecciona el tipo de usuario</option>
            <option value="medico">Médico</option>
            <option value="medicina_legal">Medicina Legal</option>
            <option value="fiscalia">Fiscalía</option>
          </select>
        </div>

        {/* Input para el correo del usuario */}
        <div className="form-group">
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={handleCorreoChange}
            placeholder="Ingresa el correo del usuario"
            className="input-crearUsuario"
            required
          />
        </div>

        {/* Input para la contraseña */}
        <div className="form-group">
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={handleContrasenaChange}
            placeholder="Ingresa la contraseña"
            className="input-crearUsuario"
            required
          />
        </div>

        <button
          className="btn-crearUsuario"
          onClick={handleCrearUsuario}
          disabled={!nombreUsuario || !tipoUsuario || !correo || !contrasena} // Deshabilitar si faltan campos
        >
          Crear Usuario
        </button>
      </div>
      </div>
      <br/>
      <div className="footer-margin"></div>
    </div>
  );
};
