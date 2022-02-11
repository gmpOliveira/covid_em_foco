const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Adm = require('../models/Adm');
const Boletim = require('../models/Boletim');
const Cidade = require('../models/Cidade');
const Morador = require('../models/Morador');
const Vacina = require('../models/Vacina');
const Master = require('../models/Master');

const connection = new Sequelize(dbConfig);

Adm.init(connection);
Boletim.init(connection);
Cidade.init(connection);
Morador.init(connection);
Vacina.init(connection);
Master.init(connection);

Adm.associate(connection.models);
Boletim.associate(connection.models);
Cidade.associate(connection.models);
Morador.associate(connection.models);
Vacina.associate(connection.models);


module.exports = connection;