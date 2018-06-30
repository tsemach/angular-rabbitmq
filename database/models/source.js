'use strict';
module.exports = (sequelize, DataTypes) => {
  var Source = sequelize.define('Source', {
    name: DataTypes.STRING
  }, {});
  Source.associate = function(models) {
    // associations can be defined here
    Filter.belongsTo(models.Rule, {
	  as: 'Rule',
      foreignKey: {
        name: 'ruleId',
        allowNull: true
      ,}
      onDelete: 'CASCADE'
    });
  };
  return Source;
};
