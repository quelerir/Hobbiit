const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tread extends Model {
    
    static associate({ User, Post }) {
      this.hasMany(Post, { foreignKey: 'tread_id' });
      this.belongsTo(User, { foreignKey: 'user_id'});
      this.belongsToMany(User, { through: 'Subscribes', as: 'userTreads', foreignKey: 'user_id' });
      this.belongsToMany(User, { through: 'Subscribes', as: 'subscribers', foreignKey: 'tread_id' });
    }
  }
  Tread.init({
    treadtitle: DataTypes.STRING,
    treadbody: DataTypes.TEXT,
    treadimg: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tread',
  });
  return Tread;
};
