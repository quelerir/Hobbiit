const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.User, {
        through: models.FriendShip,
        as: 'SubjectUsers',
        foreignKey: 'subjectUserId',
      });
      User.belongsToMany(models.User, {
        through: models.FriendShip,
        as: 'ObjectUsers',
        foreignKey: 'objectUserId',
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      location: DataTypes.STRING,
      about: DataTypes.TEXT,
      avatar: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
