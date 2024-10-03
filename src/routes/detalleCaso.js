const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const pdfParse = require('pdf-parse');
const crypto = require('crypto');
const connection = require('../config/transactionHandler');

router.use(express.json());

// Configuración de multer para almacenar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/home/administrador/BackEnd/src/uploads'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null,`${Date.now()}-${file.originalname}`); // Nombre único para el archivo
  },
});

const upload = multer({ storage: storage });

// Ruta para recibir el archivo
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // El archivo se ha subido correctamente
    const { tipoArchivo, numCaso, responsable } = req.body;
    const hashDoc = await hashPdf(req.file.path);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const fullDay = year + "-" + month + "-" + day;
    const assetId = `asset${Date.now()}`;
    const args = [ "2", numCaso, tipoArchivo, req.file.filename, fullDay, responsable ];
    const transactionResponse = await connection.submitTransaction('blockchain_medicina_forense', 'agregarDocumento', ...args);
    // Enviar la respuesta una vez que la transacción esté completa
    res.json({
        message: 'Archivo subido y transacción completada exitosamente',
        file: req.file,
        transactionResponse: transactionResponse
    });
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    res.status(500).json({ message: 'Error al subir el archivo' });
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
    return hashedContent
  } catch (err) {
    return "Error al procesar el PDF:", err;
  }
}

module.exports = router;