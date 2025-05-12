const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const fs = require("fs");
const { Caso, Usuario, HistorialCaso } = require("../db/models");
const connection = require("../config/transactionHandler");
let path = "/tmp/"

router.use(express.json());

router.post("/crear-historia", async (req, res) => {
  try {
    const { caso, des, userId } = req.body;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const fullDay = year + "-" + month + "-" + day;

    const userR = req.body.userId;

    const usuario = await Usuario.findOne({
      where: {
        id: userR,
      },
      attributes: ["certificatepath", "mspid", "privatekeypath"],
    });

    const mspId = usuario.dataValues.mspid;
    const certificatepath = usuario.dataValues.certificatepath;
    const prvtKeyPath = usuario.dataValues.privatekeypath;

    const newHash = crypto
      .createHash("sha256")
      .update(mspId)
      .digest("hex");

    let storedHash = null;
    // Leer el hash almacenado si el archivo existe
    if (fs.existsSync(filePath)) {
      storedHash = fs.readFileSync(filePath, "utf8");
    }

    if (newHash != storedHash) {
      return res.status(403).json({ error: "Acceso denegado" });
    }
    const hashFisc = crypto.createHash("sha256").update("FiscaliaMSP").digest("hex");
    // Bloqueo de acceso para Fiscalia
    if (hashFisc === storedHash) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const id = fs.readFileSync("src/config/ids.txt", "utf8");

    const nuevoHistorial = [
      id,
      req.body.caso,
      fullDay,
      req.body.des,
      "",
      userR,
    ];

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

    const newHash = crypto.createHash("sha256").update(userId).digest("hex");

    let storedHash = null;
    // Leer el hash almacenado si el archivo existe
    if (fs.existsSync(filePath)) {
      storedHash = fs.readFileSync(filePath, "utf8");
    }

    if (newHash != storedHash) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const usuario = await Usuario.findOne({
      where: {
        id: userId,
      },
      attributes: ["certificatepath", "mspid", "privatekeypath"],
    });

    const mspId = usuario.dataValues.mspid;
    const certificatepath = usuario.dataValues.certificatepath;
    const prvtKeyPath = usuario.dataValues.privatekeypath;

    const nuevoHistorial = [numCaso];

    const transactionResponse = await connection.queryTransaction(
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

    const ids = jsonData
      .map((item) => item.usuarioResponsable)
      .filter((usuarioResponsable) => usuarioResponsable !== undefined);

    for (const id of ids) {
      // Obtenemos el nombre completo del usuario
      const nom_res = await Usuario.findOne({
        where: { id: id },
        attributes: ["nombre_completo"],
      });

      // Actualizamos el JSON original con el nombre completo
      jsonData.forEach((item) => {
        if (item.usuarioResponsable === id) {
          item.usuarioResponsable = nom_res
            ? nom_res.nombre_completo
            : "Usuario no encontrado";
        }
      });
    }

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
