// routes/usuarios.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Usuario = require("../db/models/Usuario");
const fs = require('fs');
let path = "/tmp/"

router.use(express.json());

router.post("/login", async (req, res) => {
  try {
    const { correoReq, contrasenaReq } = req.body;

    // Validamos que los parámetros existan
    if (!correoReq || !contrasenaReq) {
      return res
        .status(400)
        .json({ error: "Correo y contraseña son requeridos" });
    }

    // Buscamos al usuario
    const usuario = await Usuario.findOne({
      where: {
        correo: correoReq,
        contrasena: contrasenaReq,
      },
      attributes: ["id", "mspid"]
    });

    // Hashear el valor de mspid
    const hash = crypto.createHash('sha256').update(usuario.mspid).digest('hex');
    // Guardar el hash en un archivo
    const filePath = path + 'hashed_mspid.txt';
    fs.writeFileSync(filePath, hash, 'utf8');

    res.json(usuario);
  } catch (error) {
    console.error("Error al buscar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para crear un nuevo usuario
router.post("/crear-usuario", async (req, res) => {
  const { nombre_completo, correo, contrasena, rol } = req.body;
  const hashedPassword = await bcrypt.hash(contrasena, 10);
  const nuevoUsuario = await Usuario.create({
    nombre_completo,
    correo,
    contrasena: hashedPassword,
    rol,
  });
  res.json(nuevoUsuario);
});

module.exports = router;
