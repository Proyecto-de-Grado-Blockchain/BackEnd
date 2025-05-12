// routes/casos.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { Caso, Usuario } = require("../db/models");
const fs = require("fs");
const connection = require("../config/transactionHandler");
let path = "/tmp/";

router.use(express.json());

//FILTROS
router.post("/casos-activos", async (req, res) => {
  try {
    const { seleccion2, entrada2, userId } = req.body;
    //Obtiene información de un usuario en la base de datos postgres
    const usuario = await Usuario.findOne({
      where: {
        id: userId,
      },
      attributes: ["certificatepath", "mspid", "privatekeypath"],
    });

    const mspId = usuario.dataValues.mspid;
    const certificatepath = usuario.dataValues.certificatepath;
    const prvtKeyPath = usuario.dataValues.privatekeypath;

    let transactionResponse = "";
    const args = [seleccion2, entrada2, "Activo"];

    //CONSULTA A RED BLOCKCHAIN
    transactionResponse = await connection.queryTransaction(
      "blockchain_medicina_forense",
      "consultarCasosPorFiltro",
      mspId,
      certificatepath,
      prvtKeyPath,
      ...args
    );

    const responseString = Buffer.from(transactionResponse).toString("utf8");
    const jsonData = JSON.parse(responseString);
    console.log(seleccion2 + " " + entrada2);

    const ids = jsonData
      .map((item) => item.idUsuario)
      .filter((idUsuario) => idUsuario !== undefined);

    for (const id of ids) {
      // Obtenemos el nombre completo del usuario
      const nom_res = await Usuario.findOne({
        where: { id: id },
        attributes: ["nombre_completo"],
      });

      // Actualizamos el JSON original con el nombre completo
      jsonData.forEach((item) => {
        if (item.idUsuario === id) {
          item.idUsuario = nom_res
            ? nom_res.nombre_completo
            : "Usuario no encontrado";
        }
      });
    }

    console.log(jsonData);

    res.json({
      message: "Casos obtenidos exitosamente",
      transactionResponse: jsonData,
    });
  } catch (error) {
    console.error("Error al buscar los casos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/casos-activos", async (req, res) => {
  try {
    const { userId, numCaso } = req.query;

    //Obtiene información de un usuario en la base de datos postgres
    const usuario = await Usuario.findOne({
      where: {
        id: userId,
      },
      attributes: ["certificatepath", "mspid", "privatekeypath"],
    });

    const mspId = usuario.dataValues.mspid;
    const certificatepath = usuario.dataValues.certificatepath;
    const prvtKeyPath = usuario.dataValues.privatekeypath;

    let storedHash = null;
    const filePath = path + "hashed_mspid.txt";
    const newHash = crypto.createHash("sha256").update(mspId).digest("hex");
    // Leer el hash almacenado si el archivo existe
    if (fs.existsSync(filePath)) {
      storedHash = fs.readFileSync(filePath, "utf8");
    }

    if (newHash != storedHash) {
      return res.status(403).json({ error: "Acceso denegado" });
    }
    const hashFisc = crypto
      .createHash("sha256")
      .update("FiscaliaMSP")
      .digest("hex");
    // Bloqueo de acceso para Fiscalia
    if (hashFisc === storedHash) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

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

    const ids = jsonData
      .map((item) => item.idUsuario)
      .filter((idUsuario) => idUsuario !== undefined);

    for (const id of ids) {
      // Obtenemos el nombre completo del usuario
      const nom_res = await Usuario.findOne({
        where: { id: id },
        attributes: ["nombre_completo"],
      });

      // Actualizamos el JSON original con el nombre completo
      jsonData.forEach((item) => {
        if (item.idUsuario === id) {
          item.idUsuario = nom_res
            ? nom_res.nombre_completo
            : "Usuario no encontrado";
        }
      });
    }

    res.json({
      message: "Casos obtenidos exitosamente",
      transactionResponse: jsonData,
    });
  } catch {
    res
      .status(500)
      .json({
        error: "Error al realizar la transacción",
        details: error.message,
      });
  }
});

//FILTROS
router.post("/casos-inactivos", async (req, res) => {
  try {
    const { seleccion2, entrada2, userId } = req.body;
    //Obtiene información de un usuario en la base de datos postgres
    const usuario = await Usuario.findOne({
      where: {
        id: userId,
      },
      attributes: ["certificatepath", "mspid", "privatekeypath"],
    });

    const mspId = usuario.dataValues.mspid;
    const certificatepath = usuario.dataValues.certificatepath;
    const prvtKeyPath = usuario.dataValues.privatekeypath;

    let transactionResponse = "";
    const args = [seleccion2, entrada2, "Cerrado"];

    //CONSULTA A RED BLOCKCHAIN
    transactionResponse = await connection.queryTransaction(
      "blockchain_medicina_forense",
      "consultarCasosPorFiltro",
      mspId,
      certificatepath,
      prvtKeyPath,
      ...args
    );

    const responseString = Buffer.from(transactionResponse).toString("utf8");
    const jsonData = JSON.parse(responseString);
    console.log(seleccion2 + " " + entrada2);

    const ids = jsonData
      .map((item) => item.idUsuario)
      .filter((idUsuario) => idUsuario !== undefined);

    for (const id of ids) {
      // Obtenemos el nombre completo del usuario
      const nom_res = await Usuario.findOne({
        where: { id: id },
        attributes: ["nombre_completo"],
      });

      // Actualizamos el JSON original con el nombre completo
      jsonData.forEach((item) => {
        if (item.idUsuario === id) {
          item.idUsuario = nom_res
            ? nom_res.nombre_completo
            : "Usuario no encontrado";
        }
      });
    }

    console.log(jsonData);

    res.json({
      message: "Casos obtenidos exitosamente",
      transactionResponse: jsonData,
    });
  } catch (error) {
    console.error("Error al buscar los casos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/casos-inactivos", async (req, res) => {
  try {
    const { userId, numCaso } = req.query;
    //Obtiene información de un usuario en la base de datos postgres
    const usuario = await Usuario.findOne({
      where: {
        id: userId,
      },
      attributes: ["certificatepath", "mspid", "privatekeypath"],
    });

    const mspId = usuario.dataValues.mspid;
    const certificatepath = usuario.dataValues.certificatepath;
    const prvtKeyPath = usuario.dataValues.privatekeypath;

    console.log(usuario.dataValues);

    let transactionResponse = "";

    if (!numCaso) {
      const args = ["Cerrado"];

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

    const ids = jsonData
      .map((item) => item.idUsuario)
      .filter((idUsuario) => idUsuario !== undefined);

    for (const id of ids) {
      // Obtenemos el nombre completo del usuario
      const nom_res = await Usuario.findOne({
        where: { id: id },
        attributes: ["nombre_completo"],
      });

      // Actualizamos el JSON original con el nombre completo
      jsonData.forEach((item) => {
        if (item.idUsuario === id) {
          item.idUsuario = nom_res
            ? nom_res.nombre_completo
            : "Usuario no encontrado";
        }
      });
    }

    res.json({
      message: "Casos obtenidos exitosamente",
      transactionResponse: jsonData,
    });
  } catch {
    res.status(500).json({ error: "Error al realizar la transacción", details: error.message });
  }
});

router.post("/crear-caso", async (req, res) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    month = month.toString().length === 1 ? "0" + month : month;
    let day = today.getDate();
    day = day.toString().length === 1 ? "0" + day : day;
    let fullDay = "";
    fullDay = year + "-" + month + "-" + day;

    const { paciente, caso, responsable } = req.body;

    const id = fs.readFileSync("src/config/ids.txt", "utf8");
    const nuevoCaso = [id, caso, paciente, fullDay, "Activo", responsable];

    const usuario = await Usuario.findOne({
      where: {
        id: responsable,
      },
      attributes: ["certificatepath", "mspid", "privatekeypath"],
    });

    const mspId = usuario.dataValues.mspid;
    const certificatepath = usuario.dataValues.certificatepath;
    const prvtKeyPath = usuario.dataValues.privatekeypath;

    const newHash = crypto.createHash("sha256").update(mspId).digest("hex");

    let storedHash = null;
    const filePath = path + "hashed_mspid.txt";
    // Leer el hash almacenado si el archivo existe
    if (fs.existsSync(filePath)) {
      storedHash = fs.readFileSync(filePath, "utf8");
    }

    if (newHash != storedHash) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const hashFisc = crypto
      .createHash("sha256")
      .update("FiscaliaMSP")
      .digest("hex");

    // Bloqueo de acceso para Fiscalia
    if (hashFisc === storedHash) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

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

router.post("/cerrar-caso", async (req, res) => {
  try {
    const { caso, des, responsable } = req.body;
    console.log(caso);

    const nuevoCaso = [caso, "estado", "Cerrado"];

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
      "actualizarCaso",
      mspId,
      certificatepath,
      prvtKeyPath,
      ...nuevoCaso
    );
    const responseString = Buffer.from(transactionResponse).toString("utf8");
    const jsonData = JSON.parse(responseString);

    res.json({
      message: "Caso cerrado y transacción completada exitosamente",
      transactionResponse: jsonData,
    });
  } catch (error) {
    console.error("Error al buscar los casos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
