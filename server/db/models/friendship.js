const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    static associate(models) {
      Friendship.belongsTo(models.User, { foreignKey: 'subjectuser_id', as: 'SubjectUser' });
      Friendship.belongsTo(models.User, { foreignKey: 'objectuser_id', as: 'ObjectUser' });
    }
  }
  Friendship.init(
    {
      subjectuser_id: DataTypes.INTEGER,
      objectuser_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Friendship',
    },
  );
  return Friendship;
};
