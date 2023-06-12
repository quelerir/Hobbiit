const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscribe extends Model {
   
    static associate({ User, Tread }) {
      this.belongsTo(User, { foreignKey: 'user_id', as: 'userTreads' });
      this.belongsTo(Tread, { foreignKey: 'tread_id', as: 'subscribers' });
    }
  }
  Subscribe.init({
    tread_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Subscribe',
  });
  return Subscribe;
};
