const { Model, DataTypes } = require('sequelize');

class Master extends Model {
  static init(connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
      {
        sequelize: connection,
      })
  }
}

module.exports = Master;