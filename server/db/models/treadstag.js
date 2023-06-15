const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TreadsTag extends Model {
    
    static associate() {
    
    }
  }
  TreadsTag.init({
    tread_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TreadsTag',
  });
  return TreadsTag;
};