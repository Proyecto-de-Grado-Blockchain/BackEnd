// models/CentroAyuda.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

const CentroAyuda = sequelize.define('CentroAyuda', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipo_manual: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre_archivo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_subida: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'centro_ayuda',
    timestamps: false
});

module.exports = CentroAyuda;