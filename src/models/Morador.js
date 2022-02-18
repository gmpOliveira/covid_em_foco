const { Model, DataTypes } = require('sequelize');

class Morador extends Model {
  static init(connection) {
    super.init({
      cpf: {
        type: DataTypes.STRING(15),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      codigo_ibge: DataTypes.INTEGER,
      nome: DataTypes.STRING,
      data_de_nascimento: DataTypes.DATE,
      is_obito: DataTypes.BOOLEAN,
    },
      {
        sequelize: connection,
        tableName: "moradores"
      })
  }
  static associate(models) {
    this.belongsTo(models.Cidade, { foreignKey: 'codigo_ibge', as: 'cidade' });
    this.hasMany(models.Vacina, { foreignKey: 'cpf', as: 'vacina' });
  }
}

module.exports = Morador;