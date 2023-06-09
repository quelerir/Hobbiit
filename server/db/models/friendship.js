const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FriendShip extends Model {
    static associate(models) {
      FriendShip.belongsTo(models.User, { foreignKey: 'subjectuser_id', as: 'SubjectUser' });
      FriendShip.belongsTo(models.User, { foreignKey: 'objectuser_id', as: 'ObjectUser' });
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
