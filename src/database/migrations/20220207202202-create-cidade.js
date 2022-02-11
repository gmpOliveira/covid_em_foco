'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('cidades', {
      codigo_ibge: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      cep: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total_casos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_obitos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_vacinados: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      populacao_estimada: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cidades');
  },
};
