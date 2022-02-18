const { Model, DataTypes } = require('sequelize');

class Adm extends Model {
  static init(connection) {
    super.init({
      codigo_ibge: DataTypes.INTEGER,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
      {
        sequelize: connection,
      })
  }
  static associate(models) {
    this.belongsTo(models.Cidade, { foreignKey: 'codigo_ibge', as: 'cidade' });
  }
}

module.exports = Adm;