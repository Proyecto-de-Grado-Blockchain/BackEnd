// routes/casos.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Caso = require('../db/models/Caso');

router.use(express.json());

// Ruta para obtener todos los usuarios
router.post('/casos-activos', async (req, res) => {
    try {
      const { seleccion1, seleccion2, entrada1, entrada2 } = req.body; // Obtenemos los datos del cuerpo de la solicitud
      
      // Validamos que los parámetros existan
      if (!entrada1 || !entrada2) {
        return res.status(400).json({ error: 'Los filtros de busqueda de casos son requeridos' });
      }
  
      // Buscamos los casos
      if(seleccion1 === "Nombre"){
        if(seleccion2 === "Estado"){
            const caso = await Caso.findAll({
                where: {
                    estado: entrada2
                },
            });
            console.log(caso);
            res.json(caso);
        }
      }
    } catch (error) {
      console.error('Error al buscar los casos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

module.exports = router;