// models/HistorialCaso.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Caso = require('./Caso'); // Asegúrate de importar el modelo Caso

const HistorialCaso = sequelize.define('HistorialCaso', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_caso: {
        type: DataTypes.INTEGER,
        references: {
            model: Caso,
            key: 'id'
        },
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    notas: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    usuario_responsable: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'historial_casos',
    timestamps: false
});

module.exports = HistorialCaso;