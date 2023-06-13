

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Aprove extends Model {
    
    static associate() {
    }
  }
  Aprove.init({
    userstag_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Aprove',
  });
  return Aprove;
};