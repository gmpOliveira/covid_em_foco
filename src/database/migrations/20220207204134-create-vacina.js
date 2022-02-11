'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('vacinas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      cpf: {
        type: Sequelize.STRING(15),
        allowNull: false,
        references: { model: 'moradores', key: 'cpf' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_vacinado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      numero_vacinas: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      primeira_dose: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      segunda_dose: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      terceira_dose: {
        type: Sequelize.DATE,
        allowNull: true,
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
    return queryInterface.dropTable('vacinas');
  }
};
