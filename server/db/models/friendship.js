const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FriendShip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FriendShip.belongsTo(models.User, { foreignKey: 'subjectUserId', as: 'SubjectUser' });
      FriendShip.belongsTo(models.User, { foreignKey: 'objectUserId', as: 'ObjectUser' });
    }
  }
  FriendShip.init(
    {
      subjectUserId: DataTypes.INTEGER,
      objectUserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'FriendShip',
    },
  );
  return FriendShip;
};
