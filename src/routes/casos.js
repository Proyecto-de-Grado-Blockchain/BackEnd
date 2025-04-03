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

/* CONSULTA A BASE DE DATOS POSTGRES
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
});*/

router.get("/casos-activos", async (req, res) => {
  const { userId, numCaso } = req.query;
  //Obtiene información de un usuario en la base de datos postgres
  const usuario = await Usuario.findOne({
    where: {
      id: userId,
    },
  });

  const mspId = usuario.dataValues.mspid;
  const certificatepath = usuario.dataValues.certificatepath;
  const prvtKeyPath = usuario.dataValues.privatekeypath;

  let transactionResponse = "";

  if (!numCaso) {
    const args = ["Activo"];

    //CONSULTA A RED BLOCKCHAIN
    transactionResponse = await connection.queryTransaction(
      "blockchain_medicina_forense",
      "consultarCasosPorEstado",
      mspId,
      certificatepath,
      prvtKeyPath,
      ...args
    );
  } else {
    const args = [numCaso];

    //CONSULTA A RED BLOCKCHAIN
    transactionResponse = await connection.queryTransaction(
      "blockchain_medicina_forense",
      "consultarCaso",
      mspId,
      certificatepath,
      prvtKeyPath,
      ...args
    );
  }

  //Trasnforma la respuesta del chaincode a string y a JSON
  const responseString = Buffer.from(transactionResponse).toString("utf8");
  const jsonData = JSON.parse(responseString);

  console.log(jsonData);

  res.json({
    message: "Casos obtenidos exitosamente",
    transactionResponse: jsonData,
  });
});

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
    if (!numCaso) {
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
    } else {
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
    const id = fs.readFileSync("src/config/ids.txt", "utf8");
    const nuevoCaso = [id, caso, paciente, fullDay, "Activo", responsable];

    const usuario = await Usuario.findOne({
      where: {
        id: responsable,
      },
    });

    const mspId = usuario.dataValues.mspid;
    const certificatepath = usuario.dataValues.certificatepath;
    const prvtKeyPath = usuario.dataValues.privatekeypath;

    const transactionResponse = await connection.submitTransaction(
      "blockchain_medicina_forense",
      "crearCaso",
      mspId,
      certificatepath,
      prvtKeyPath,
      ...nuevoCaso
    );

    const idInt = parseInt(id) + 1;
    fs.writeFileSync("src/config/ids.txt", idInt + "", "utf8");

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
