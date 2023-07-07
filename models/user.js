'use strict';
const { Model } = require('sequelize');
const { singleton } = require('tsyringe');
module.exports = (sequelize, DataTypes) => {
  @singleton()
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'User',
      tableName: 'users',
    }
  );
  return User;
};
