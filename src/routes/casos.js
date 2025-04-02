// routes/casos.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Caso, Usuario } = require("../db/models");
const fs = require("fs");
const connection = require("../config/transactionHandler");

router.use(express.json());

//FILTROS
router.post("/casos-activos", async (req, res) => {
  try {
    const { seleccion2, entrada2 } = req.body; // Obtenemos los datos del cuerpo de la solicitud

    // Buscamos los casos
    if (seleccion2 === "Número de caso") {
      const caso = await Caso.findAll({
        where: {
          numero_caso: entrada2,
          estado: "Activo",
        },
        include: [
          {
            model: Usuario,
            attributes: ["nombre_completo"],
          },
        ],
      });
      const casosFormateados = caso.map((c) => {
        return {
          nombre_paciente: c.nombre_paciente,
          id_usuario: c.Usuario.nombre_completo,
          fecha_creacion: c.fecha_creacion,
          estado: c.estado,
          numero_caso: c.numero_caso,
        };
      });
      res.json(casosFormateados);
    } else if (seleccion2 === "Nombre") {
      const caso = await Caso.findAll({
        where: {
          nombre_paciente: entrada2,
          estado: "Activo",
        },
        include: [
          {
            model: Usuario,
            attributes: ["nombre_completo"],
          },
        ],
      });
      const casosFormateados = caso.map((c) => {
        return {
          nombre_paciente: c.nombre_paciente,
          id_usuario: c.Usuario.nombre_completo,
          fecha_creacion: c.fecha_creacion,
          estado: c.estado,
          numero_caso: c.numero_caso,
        };
      });
      res.json(casosFormateados);
    } else if (seleccion2 === "Estado") {
      const caso = await Caso.findAll({
        where: {
          estado: entrada2,
          estado: "Activo",
        },
        include: [
          {
            model: Usuario,
            attributes: ["nombre_completo"],
          },
        ],
      });
      const casosFormateados = caso.map((c) => {
        return {
          nombre_paciente: c.nombre_paciente,
          id_usuario: c.Usuario.nombre_completo,
          fecha_creacion: c.fecha_creacion,
          estado: c.estado,
          numero_caso: c.numero_caso,
        };
      });
      res.json(casosFormateados);
    } else if (seleccion2 === "Fecha") {
      const caso = await Caso.findAll({
        where: {
          fecha_creacion: entrada2,
          estado: "Activo",
        },
        include: [
          {
            model: Usuario,
            attributes: ["nombre_completo"],
          },
        ],
      });
      const casosFormateados = caso.map((c) => {
        return {
          nombre_paciente: c.nombre_paciente,
          id_usuario: c.Usuario.nombre_completo,
          fecha_creacion: c.fecha_creacion,
          estado: c.estado,
          numero_caso: c.numero_caso,
        };
      });
      res.json(casosFormateados);
    } else if (seleccion2 === "Médico Forense") {
      const usuario = await Usuario.findOne({
        attributes: ["id"],
        where: {
          nombre_completo: entrada2,
        },
      });

      const caso = await Caso.findAll({
        where: {
          id_usuario: usuario.id,
          estado: "Activo",
        },
        include: [
          {
            model: Usuario,
            attributes: ["nombre_completo"],
          },
        ],
      });
      const casosFormateados = caso.map((c) => {
        return {
          nombre_paciente: c.nombre_paciente,
          id_usuario: c.Usuario.nombre_completo,
          fecha_creacion: c.fecha_creacion,
          estado: c.estado,
          numero_caso: c.numero_caso,
        };
      });
      res.json(casosFormateados);
    }
  } catch (error) {
    console.error("Error al buscar los casos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// CONSULTA A BASE DE DATOS POSTGRES
router.get("/casos-activos", async (req, res) => {
  try {
    const { numCaso } = req.query;
    let caso = "";
    if (!numCaso){
      caso = await Caso.findAll({
        where: {
          estado: "Activo",
        },
        include: [
          {
            model: Usuario,
            attributes: ["nombre_completo"],
          },
        ],
      });
    }else{
      caso = await Caso.findAll({
        where: {
          numero_caso: numCaso,
        },
        include: [
          {
            model: Usuario,
            attributes: ["nombre_completo"],
          },
        ],
      });
    }
    
    const casosFormateados = caso.map((c) => {
      return {
        nombre_paciente: c.nombre_paciente,
        id_usuario: c.Usuario.nombre_completo,
        fecha_creacion: c.fecha_creacion,
        estado: c.estado,
        numero_caso: c.numero_caso,
      };
    });
    res.json(casosFormateados);
  } catch (error) {
    console.error("Error al buscar los casos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

/*
route.get("/casos-activos", async (req, res) => {
  //CONSULTA A RED BLOCKCHAIN
  const transactionResponse = await connection.submitTransaction(
    "blockchain_medicina_forense",
    "crearCaso",
    ...nuevoCaso
  );
})*/

//FILTROS
router.post("/casos-inactivos", async (req, res) => {
  try {
    const { seleccion2, entrada2 } = req.body; // Obtenemos los datos del cuerpo de la solicitud

    // Buscamos los casos
    if (seleccion2 === "Número de caso") {
      const caso = await Caso.findAll({
        where: {
          numero_caso: entrada2,
          estado: "Inactivo",
        },
        include: [
          {
            model: Usuario,
            attributes: ["nombre_completo"],
          },
        ],
      });
      const casosFormateados = caso.map((c) => {
        return {
          nombre_paciente: c.nombre_paciente,
          id_usuario: c.Usuario.nombre_completo,
          fecha_creacion: c.fecha_creacion,
          estado: c.estado,
          numero_caso: c.numero_caso,
        };
      });
      res.json(casosFormateados);
    } else if (seleccion2 === "Nombre") {
      const caso = await Caso.findAll({
        where: {
          nombre_paciente: entrada2,
          estado: "Inactivo",
        },
        include: [
          {
            model: Usuario,
            attributes: ["nombre_completo"],
          },
        ],
      });
      const casosFormateados = caso.map((c) => {
        return {
          nombre_paciente: c.nombre_paciente,
          id_usuario: c.Usuario.nombre_completo,
          fecha_creacion: c.fecha_creacion,
          estado: c.estado,
          numero_caso: c.numero_caso,
        };
      });
      res.json(casosFormateados);
    } else if (seleccion2 === "Estado") {
      const caso = await Caso.findAll({
        where: {
          estado: entrada2,
          estado: "Inactivo",
        },
        include: [
          {
            model: Usuario,
            attributes: ["nombre_completo"],
          },
        ],
      });
      const casosFormateados = caso.map((c) => {
        return {
          nombre_paciente: c.nombre_paciente,
          id_usuario: c.Usuario.nombre_completo,
          fecha_creacion: c.fecha_creacion,
          estado: c.estado,
          numero_caso: c.numero_caso,
        };
      });
      res.json(casosFormateados);
    } else if (seleccion2 === "Fecha") {
      const caso = await Caso.findAll({
        where: {
          fecha_creacion: entrada2,
          estado: "Inactivo",
        },
        include: [
          {
            model: Usuario,
            attributes: ["nombre_completo"],
          },
        ],
      });
      const casosFormateados = caso.map((c) => {
        return {
          nombre_paciente: c.nombre_paciente,
          id_usuario: c.Usuario.nombre_completo,
          fecha_creacion: c.fecha_creacion,
          estado: c.estado,
          numero_caso: c.numero_caso,
        };
      });
      res.json(casosFormateados);
    } else if (seleccion2 === "Médico Forense") {
      const usuario = await Usuario.findOne({
        attributes: ["id"],
        where: {
          nombre_completo: entrada2,
        },
      });

      const caso = await Caso.findAll({
        where: {
          id_usuario: usuario.id,
          estado: "Inactivo",
        },
        include: [
          {
            model: Usuario,
            attributes: ["nombre_completo"],
          },
        ],
      });
      const casosFormateados = caso.map((c) => {
        return {
          nombre_paciente: c.nombre_paciente,
          id_usuario: c.Usuario.nombre_completo,
          fecha_creacion: c.fecha_creacion,
          estado: c.estado,
          numero_caso: c.numero_caso,
        };
      });
      res.json(casosFormateados);
    }
  } catch (error) {
    console.error("Error al buscar los casos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/casos-inactivos", async (req, res) => {
  try {
    const { numCaso } = req.query;
    let caso = "";
    if (!numCaso){
      caso = await Caso.findAll({
        where: {
          estado: "Inactivo",
        },
        include: [
          {
            model: Usuario,
            attributes: ["nombre_completo"],
          },
        ],
      });
    }else{
      caso = await Caso.findAll({
        where: {
          numero_caso: numCaso,
        },
        include: [
          {
            model: Usuario,
            attributes: ["nombre_completo"],
          },
        ],
      });
    }
    const casosFormateados = caso.map((c) => {
      return {
        nombre_paciente: c.nombre_paciente,
        id_usuario: c.Usuario.nombre_completo,
        fecha_creacion: c.fecha_creacion,
        estado: c.estado,
        numero_caso: c.numero_caso,
      };
    });
    res.json(casosFormateados);
  } catch (error) {
    console.error("Error al buscar los casos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/crear-caso", async (req, res) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const fullDay = year + "-" + month + "-" + day;

    const { paciente, caso, responsable } = req.body;
    const id = fs.readFileSync("src/config/idCaso.txt", "utf8");
    const nuevoCaso = [
      id,
      caso,
      paciente,
      fullDay,
      "Activo",
      responsable
    ]

    const transactionResponse = await connection.submitTransaction(
      "blockchain_medicina_forense",
      "crearCaso",
      ...nuevoCaso
    );

    const idInt = parseInt(id) + 1;
    fs.writeFileSync("src/config/idCaso.txt", idInt + "", "utf8");

    res.json({
      message: "Caso creado y transacción completada exitosamente",
      transactionResponse: transactionResponse,
    });
  } catch (error) {
    console.error("Error al buscar los casos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
