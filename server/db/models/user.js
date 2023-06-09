const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Tread, Like, Post, Comment, UsersTag }) {
      this.hasMany(Tread, { foreignKey: 'user_id'});
      this.hasMany(Like, { foreignKey: 'user_id' });
      this.belongsToMany(Tread, {
        through: 'Subscribes',
        as: 'subscribers',
        foreignKey: 'tread_id',
      });
      this.belongsToMany(Tread, {
        through: 'Subscribes',
        as: 'userTreads',
        foreignKey: 'user_id',
      });
      this.hasMany(Post, { foreignKey: 'user_id' });
      this.hasMany(Comment, { foreignKey: 'user_id' });
      this.belongsToMany(User, {
        through: 'Friendships',
        as: 'SubjectUsers',
        foreignKey: 'subjectuser_id',
      });
      this.belongsToMany(User, {
        through: 'Friendships',
        as: 'ObjectUsers',
        foreignKey: 'objectuser_id',
      });
      this.belongsToMany(User, {
        through: 'Messages',
        as: 'SubjectChatUsers',
        foreignKey: 'subjectchatuser_id',
      });
      this.belongsToMany(User, {
        through: 'Messages',
        as: 'ObjectChatUsers',
        foreignKey: 'objectchatuser_id',
      });
      this.belongsToMany(UsersTag, { through: 'Aproves', as: 'tagsaprovedbyUser', foreignKey: 'user_id' });
      this.belongsToMany(UsersTag, { through: 'Aproves', as: 'usersaprovesUsertag', foreignKey: 'userstag_id' });
      this.hasMany(UsersTag, { foreignKey: 'user_id' });
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
