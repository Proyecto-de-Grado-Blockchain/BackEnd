// models/Caso.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Usuario = require('./Usuario'); // Asegúrate de importar el modelo Usuario

const Caso = sequelize.define('Caso', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numero_caso: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    nombre_paciente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        },
        allowNull: false
    }
}, {
    tableName: 'casos',
    timestamps: false
});

module.exports = Caso;