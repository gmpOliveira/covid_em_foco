'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('boletins', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      codigo_ibge: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'cidades', key: 'codigo_ibge' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cep: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      data_boletim: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      confirmados_diarios: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      obitos_diarios: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vacinados_diarios: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status_diario: {
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
    return queryInterface.dropTable('boletins');
  }
};
