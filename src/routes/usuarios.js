// routes/usuarios.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Usuario = require('../db/models/Usuario');

router.use(express.json());

router.post('/login', async (req, res) => {
    try {
      const { correoReq, contrasenaReq } = req.body;
      
      // Validamos que los parámetros existan
      if (!correoReq || !contrasenaReq) {
        return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
      }
  
      // Buscamos al usuario
      const usuario = await Usuario.findOne({
        where: {
            correo: correoReq,
            contrasena: contrasenaReq
        },
      });
  
      res.json(usuario);
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
    const { nombre_completo, correo, contrasena, rol } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const nuevoUsuario = await Usuario.create({
        nombre_completo,
        correo,
        contrasena: hashedPassword,
        rol
    });
    res.json(nuevoUsuario);
});

module.exports = router;