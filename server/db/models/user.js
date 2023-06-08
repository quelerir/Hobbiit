const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Tread, Like, Subscribe, Post, Comment,
    }) {
      this.hasMany(Tread, { foreignKey: 'user_id' });
      this.hasMany(Like, { foreignKey: 'user_id' });
      this.hasMany(Subscribe, { foreignKey: 'user_id' });
      this.hasMany(Post, { foreignKey: 'user_id' });
      this.hasMany(Comment, { foreignKey: 'user_id' });
      this.belongsToMany(User, { through: 'Friendships', as: 'SubjectUsers', foreignKey: 'subjectuser_id' });
      this.belongsToMany(User, { through: 'Friendships', as: 'ObjectUsers', foreignKey: 'objectuser_id' });
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
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
