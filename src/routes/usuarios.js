// routes/usuarios.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Usuario = require('../db/models/Usuario');

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
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