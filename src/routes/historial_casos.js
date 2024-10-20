const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Caso, Usuario, HistorialCaso } = require("../db/models");

router.use(express.json());

router.post("/crear-historia", async (req, res) => {
  try {
    const { caso, des, cookie } = req.body;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const fullDay = year + "-" + month + "-" + day;
    const casoH = await Caso.findOne({
      where: {
        numero_caso: caso,
      },
    });

    const numCaso = casoH.dataValues.id;
    const userR = cookie;

    const historiacaso = await HistorialCaso.create({
      id_caso: numCaso,
      fecha: fullDay,
      descripcion: des,
      notas: "",
      usuario_responsable: userR,
    })
      .then((hcaso) => res.status(200).send(hcaso))
      .catch((error) => res.status(400).send(error));
  } catch (error) {
    console.error("Error al crear el historial del casos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/consultar-historia", async (req, res) => {
  try {
    const { numCaso } = req.query;
    const casoH = await Caso.findOne({
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

    const idCaso = casoH.dataValues.id;
    const userR = casoH.dataValues.id_usuario;

    const historiacaso = await HistorialCaso.findAll({
      where: {
        id_caso: idCaso,
      },
    });

    const historiaCasoFormateado = historiacaso.map((hc) => {
      // const usuario = Usuario.findOne({
      //   where: {
      //       id: parseInt(hc.usuario_responsable)
      //   },
      //   attributes: ['nombre_completo'] 
      // });
      return {
        fecha: hc.fecha,
        descripcion: hc.descripcion,
        usuario_responsable: hc.usuario_responsable,
      };
    });
    res.json(historiaCasoFormateado);
  } catch (error) {
    console.error("Error al consultar el historial del caso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
module.exports = router;
