const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FriendShip extends Model {
    static associate(models) {
      FriendShip.belongsTo(models.User, { foreignKey: 'subjectUserId', as: 'SubjectUser' });
      FriendShip.belongsTo(models.User, { foreignKey: 'objectUserId', as: 'ObjectUser' });
    }
  }
  FriendShip.init(
    {
      subjectuser_id: DataTypes.INTEGER,
      objectuser_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Friendship',
    },
  );
  return FriendShip;
};
