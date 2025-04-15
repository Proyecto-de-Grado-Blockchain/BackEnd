const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
const pdfParse = require("pdf-parse");
const crypto = require("crypto");
const connection = require("../config/transactionHandler");
const Documento = require("../db/models/Documento");
const { Caso } = require("../db/models");
const Usuario = require('../db/models/Usuario'); 
router.use(express.json());

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/home/administrador/BackEnd/src/uploads"); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para el archivo
  },
});

const upload = multer({ storage: storage });

// Ruta para recibir el archivo
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // El archivo se ha subido correctamente
    const { tipoArchivo, numCaso, responsable } = req.body;
    // Array con los tipos MIME de imágenes
    const imageMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/tiff",
      "image/webp",
      "image/svg+xml",
      "image/x-icon",
      "image/heic",
    ];
    console.log(req.file);
    let hashDoc = ""
    if (req.file.mimetype === "application/pdf"){
      hashDoc = await hashPdf(req.file.path);
    }else if (imageMimeTypes.includes(req.file.mimetype)){
      hashDoc = await hashImage(req.file.path);
    }
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const fullDay = year + "-" + month + "-" + day;
    const id = fs.readFileSync("src/config/ids.txt", "utf8");
    const usuario = await Usuario.findOne({
      where: {
          id: responsable
      },
      attributes: ['certificatepath', 'mspid', 'privatekeypath']
    });
    const mspId = usuario.dataValues.mspid;
    const certificatepath = usuario.dataValues.certificatepath;
    const prvtKeyPath = usuario.dataValues.privatekeypath;

    const args = [
      id,
      numCaso,
      tipoArchivo,
      req.file.filename,
      fullDay,
      responsable,
      hashDoc,
    ];
    const transactionResponse = await connection.submitTransaction(
      "blockchain_medicina_forense",
      "agregarDocumento",
      mspId,
      certificatepath,
      prvtKeyPath,
      ...args
    );

    const idInt = parseInt(id) + 1;
    fs.writeFileSync("src/config/ids.txt", idInt + "", "utf8");
    // Enviar la respuesta una vez que la transacción esté completa
    res.json({
      message: "Archivo subido y transacción completada exitosamente",
      file: req.file,
      transactionResponse: transactionResponse,
    });

  } catch (error) {
    console.error("Error al subir el archivo:", error);
    res.status(500).json({ message: "Error al subir el archivo" });
  }
});

// Función para hashear un PDF
async function hashPdf(filePath) {
  try {
    // Lee el archivo PDF
    const dataBuffer = fs.readFileSync(filePath);

    // Extrae el contenido del PDF
    const data = await pdfParse(dataBuffer);

    // Genera el hash del contenido del PDF
    const hash = crypto.createHash("sha256");
    hash.update(data.text);
    const hashedContent = hash.digest("hex");

    console.log("Hash del PDF:", hashedContent);
    return hashedContent;
  } catch (err) {
    return "Error al procesar el PDF:", err;
  }
}

async function hashImage(filePath) {
  try {
    // Lee el archivo IMG
    const dataBuffer = fs.readFileSync(filePath);
    // Genera el hash del contenido del PDF
    const hash = crypto.createHash("sha256");
    hash.update(dataBuffer);
    const hashedContent = hash.digest("hex");

    console.log("Hash de la IMG:", hashedContent);
    return hashedContent;
  } catch (err) {
    return "Error al procesar la IMG:", err;
  }
}


router.get("/obtenerDocumentos", async (req, res) => {
  try {
    const { numCaso, userId } = req.query;

    const usuario = await Usuario.findOne({
      where: {
          id: userId
      },
      attributes: ['certificatepath', 'mspid', 'privatekeypath']
    });
    const mspId = usuario.dataValues.mspid;
    const certificatepath = usuario.dataValues.certificatepath;
    const prvtKeyPath = usuario.dataValues.privatekeypath;

    // Llamar a la función de transacción en la blockchain
    const transactionResponse = await connection.queryTransaction(
      "blockchain_medicina_forense",
      "consultarDocumentosCaso",
      mspId,
      certificatepath,
      prvtKeyPath,
      numCaso
    );

    let textResponse = Object.values(transactionResponse).map(code => String.fromCharCode(code)).join('');
    const jsonTextResponse = JSON.parse(textResponse);
    console.log(jsonTextResponse)

    //Carga el doc a la carpeta uploads
    fs.readdir("/home/administrador/BackEnd/src/uploads", (err, files) => {
      if (err) {
        console.error("Error al leer la carpeta de uploads:", err);
        return res.status(500).json({ message: "Error al leer la carpeta de uploads." });
      }

      // Responder con la información de la transacción y los documentos filtrados
      res.json({
        message: "Información obtenida exitosamente",
        transactionResponse: jsonTextResponse,
      });
    });
  } catch (error) {
    console.error("Error al obtener los documentos del caso:", error);
    res.status(500).json({ message: "Error al obtener los documentos del caso" });
  }
});

module.exports = router;
