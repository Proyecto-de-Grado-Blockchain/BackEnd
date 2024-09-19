// models/index.js
const Usuario = require('./Usuario');
const Caso = require('./Caso');
const HistorialCaso = require('./HistorialCaso');
const Documento = require('./Documento');

// Relación Usuario - Caso
Usuario.hasMany(Caso, { foreignKey: 'id_usuario' });
Caso.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Relación Caso - HistorialCaso
Caso.hasMany(HistorialCaso, { foreignKey: 'id_caso' });
HistorialCaso.belongsTo(Caso, { foreignKey: 'id_caso' });

// Relación Caso - Documento
Caso.hasMany(Documento, { foreignKey: 'id_caso' });
Documento.belongsTo(Caso, { foreignKey: 'id_caso' });

module.exports = {
    Usuario,
    Caso,
    HistorialCaso,
    Documento
};