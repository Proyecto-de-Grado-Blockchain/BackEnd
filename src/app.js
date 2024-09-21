// server.js
require('dotenv').config();
const express = require('express');
const sequelize = require('./config/config');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3000', // Cambia esto al origen desde donde haces la solicitud
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Importar rutas
const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

// Iniciar el servidor y conectar a la base de datos
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch(err => {
    console.error('Error al conectar con la base de datos:', err);
});