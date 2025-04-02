// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_completo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fabricusername: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mspid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    certificatepath: {
        type: DataTypes.STRING,
        allowNull: false
    },
    privatekeypath: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;