const { Model, DataTypes } = require('sequelize');

class Cidade extends Model {
  static init(connection) {
    super.init({
      codigo_ibge:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      cep: DataTypes.INTEGER,
      nome: DataTypes.STRING,
      total_casos: DataTypes.INTEGER,
      total_obitos: DataTypes.INTEGER,
      total_vacinados: DataTypes.INTEGER,
      populacao_estimada: DataTypes.INTEGER,
    },
      {
        sequelize: connection,
      })
  }
  static associate(models) {
    this.hasMany(models.Adm, { foreignKey: 'codigo_ibge', as: 'adm' });
    this.hasMany(models.Boletim, { foreignKey: 'codigo_ibge', as: 'boletim' });
    this.hasMany(models.Morador, { foreignKey: 'codigo_ibge', as: 'morador' });
  }
}

module.exports = Cidade;