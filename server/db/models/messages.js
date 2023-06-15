const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Messages.belongsTo(models.User, { foreignKey: 'subjectchatuser_id', as: 'SubjectChatUser' });
      Messages.belongsTo(models.User, { foreignKey: 'objectchatuser_id', as: 'ObjectChatUser' });
    }
  }
  Messages.init(
    {
      subjectchatuser_id: DataTypes.INTEGER,
      objectchatuser_id: DataTypes.INTEGER,
      message: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Messages',
    },
  );
  return Messages;
};
