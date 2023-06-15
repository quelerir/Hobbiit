

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsersTag extends Model {
   
    static associate({User, Tag}) {
      this.belongsTo(User, { foreignKey: 'user_id'});
      this.belongsTo(Tag, { foreignKey: 'tag_id'});
      this.belongsToMany(User, { through: 'Aproves', as: 'tagshasaprovedbyUser', foreignKey: 'user_id' });
      this.belongsToMany(User, { through: 'Aproves', as: 'usersaprovesUsertag', foreignKey: 'userstag_id' });
      
    }
  }
  UsersTag.init({
    tag_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsersTag',
  });
  return UsersTag;
};