// models/Documento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');
const Caso = require('./Caso'); // Asegúrate de importar el modelo Caso

const Documento = sequelize.define('Documento', {
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
    tipo_documento: {
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
    },
    usuario_responsable: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'documentos',
    timestamps: false
});

module.exports = Documento;