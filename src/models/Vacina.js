const { Model, DataTypes } = require('sequelize');

class Vacina extends Model {
  static init(connection) {
    super.init({
      cpf: DataTypes.STRING(15),
      is_vacinado: DataTypes.BOOLEAN,
      numero_vacinas: DataTypes.INTEGER,
      primeira_dose: DataTypes.DATE,
      segunda_dose: DataTypes.DATE,
      terceira_dose: DataTypes.DATE,
    },
      {
        sequelize: connection,
      })
  }
  static associate(models) {
    this.belongsTo(models.Morador, { foreignKey: 'cpf', as: 'morador' });
  }
}

module.exports = Vacina;