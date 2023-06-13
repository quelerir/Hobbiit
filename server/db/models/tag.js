

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    
   
    static associate({Tread, UsersTag}) {
      this.belongsToMany(Tread, { through: 'TreadsTags', as: 'oneTreadTags', foreignKey: 'tread_id' });
      this.belongsToMany(Tread, { through: 'TreadsTags', as: 'oneTagTreads', foreignKey: 'tag_id' });
      this.hasMany(UsersTag, { foreignKey: 'user_id' });
    }
  }
  Tag.init({
    tagbody: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};