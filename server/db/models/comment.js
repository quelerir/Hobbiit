

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post, User}) {
      this.belongsTo(Post, { foreignKey: 'post_id' });
      this.belongsTo(User, { foreignKey: 'user_id'});    
    }
  }
  Comment.init({
    commentbody: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};