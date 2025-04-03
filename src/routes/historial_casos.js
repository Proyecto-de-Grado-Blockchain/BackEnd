const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const fs = require("fs");
const { Caso, Usuario, HistorialCaso } = require("../db/models");
const connection = require("../config/transactionHandler");

router.use(express.json());

router.post("/crear-historia", async (req, res) => {
  try {
    const { caso, des, userId } = req.body;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const fullDay = year + "-" + month + "-" + day;

    const userR = userId;

    const usuario = await Usuario.findOne({
      where: {
        id: userR,
      },
    });

    const mspId = usuario.dataValues.mspid;
    const certificatepath = usuario.dataValues.certificatepath;
    const prvtKeyPath = usuario.dataValues.privatekeypath;

    const id = fs.readFileSync("src/config/ids.txt", "utf8");

    const nuevoHistorial = [id, caso, fullDay, des, "", userR];

    const transactionResponse = await connection.submitTransaction(
      "blockchain_medicina_forense",
      "agregarHistorial",
      mspId,
      certificatepath,
      prvtKeyPath,
      ...nuevoHistorial
    );

    //Trasnforma la respuesta del chaincode a string y a JSON
    const responseString = Buffer.from(transactionResponse).toString("utf8");
    const jsonData = JSON.parse(responseString);
    console.log(jsonData);
    const idInt = parseInt(id) + 1;
    fs.writeFileSync("src/config/ids.txt", idInt + "", "utf8");

    res.json({
      message: "Historial creado y transacción completada exitosamente",
      transactionResponse: jsonData,
    });
  } catch (error) {
    console.error("Error al crear el historial del casos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/consultar-historia", async (req, res) => {
  try {
    const { userId, numCaso } = req.query;

    const usuario = await Usuario.findOne({
      where: {
        id: userId,
      },
    });

    const mspId = usuario.dataValues.mspid;
    const certificatepath = usuario.dataValues.certificatepath;
    const prvtKeyPath = usuario.dataValues.privatekeypath;

    const nuevoHistorial = [numCaso];

    const transactionResponse = await connection.submitTransaction(
      "blockchain_medicina_forense",
      "consultarHistorialCaso",
      mspId,
      certificatepath,
      prvtKeyPath,
      ...nuevoHistorial
    );

    //Trasnforma la respuesta del chaincode a string y a JSON
    const responseString = Buffer.from(transactionResponse).toString("utf8");
    const jsonData = JSON.parse(responseString);
    console.log(jsonData)
    res.json({
      message: "Historial consultada y transacción completada exitosamente",
      transactionResponse: jsonData,
    });
  } catch (error) {
    console.error("Error al consultar el historial del caso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
module.exports = router;
