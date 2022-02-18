const { Model, DataTypes } = require('sequelize');

class Boletim extends Model {
  static init(connection) {
    super.init({
      codigo_ibge: DataTypes.INTEGER,
      cep: DataTypes.INTEGER,
      data_boletim: DataTypes.DATE,
      confirmados_diarios: DataTypes.INTEGER,
      obitos_diarios: DataTypes.INTEGER,
      vacinados_diarios: DataTypes.INTEGER,
      status_diario: DataTypes.INTEGER,
    },
      {
        sequelize: connection,
        tableName: "boletins"
      })
  }
  static associate(models) {
    this.belongsTo(models.Cidade, { foreignKey: 'codigo_ibge', as: 'cidade' });
  }
}

module.exports = Boletim;