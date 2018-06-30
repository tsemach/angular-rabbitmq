'use strict';
module.exports = (sequelize, DataTypes) => {
  var Match = sequelize.define('Match', {
    name: DataTypes.STRING,
		type: DataTypes.STRING,
    from: DataTypes.BLOB,
    operator: DataTypes.STRING,
    what: DataTypes.BLOB
  }, {});
  Match.associate = function(models) {
    // associations can be defined here
	Match.belongsTo(models.Rule, {
      as: 'Rule',
      foreignKey: {
        name: 'ruleId',
        allowNull: true
      ,}
      onDelete: 'CASCADE'
    });
  };
  return Match;
};
