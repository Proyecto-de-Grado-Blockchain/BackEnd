const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const pdfParse = require('pdf-parse');
const crypto = require('crypto');

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
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    // El archivo se ha subido correctamente
    console.log('Archivo subido:', req.file);
    hashPdf(req.file.path);
    res.json({
      message: 'Archivo subido exitosamente',
      file: req.file,
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

    // Genera el hash del contenido del PDF (puede usar SHA-256, por ejemplo)
    const hash = crypto.createHash("sha256");
    hash.update(data.text);
    const hashedContent = hash.digest("hex");

    console.log("Hash del PDF:", hashedContent);
  } catch (err) {
    console.error("Error al procesar el PDF:", err);
  }
}

module.exports = router;