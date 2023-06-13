

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    
   
    static associate({Tread, Userstag}) {
      this.belongsToMany(Tread, { through: 'Treadtags', as: 'oneTreadTags', foreignKey: 'tread_id' });
      this.belongsToMany(Tread, { through: 'Treadtags', as: 'oneTagTreads', foreignKey: 'tag_id' });
      this.hasMany(Userstag, { foreignKey: 'user_id' });
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