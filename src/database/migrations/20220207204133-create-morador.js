'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('moradores', {
      cpf: {
        type: Sequelize.STRING(15),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      codigo_ibge: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'cidades', key: 'codigo_ibge' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      data_de_nascimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      is_obito: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('moradores');
  }
};
