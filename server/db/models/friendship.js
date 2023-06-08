const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'subjectuser_id' });
      this.belongsTo(User, { foreignKey: 'objectuser_id' });
    }
  }
  Friendship.init({
    subjectuser_id: DataTypes.INTEGER,
    objectuser_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Friendship',
  });
  return Friendship;
};
