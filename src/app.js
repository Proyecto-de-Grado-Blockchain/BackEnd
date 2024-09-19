// server.js
require('dotenv').config();
const express = require('express');
const sequelize = require('./config/config');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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