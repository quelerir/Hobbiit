const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Tread, Like }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Tread, { foreignKey: 'tread_id' });
      this.hasMany(Like, { foreignKey: 'post_id' });
    }
  }
  Post.init({
    posttitle: DataTypes.STRING,
    postbody: DataTypes.TEXT,
    postimg: DataTypes.STRING,
    likecount: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    tread_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
