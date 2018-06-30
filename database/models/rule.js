'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
    name: DataTypes.STRING,
    userIp: DataTypes.INTEGER,
    groupIp: DataTypes.INTEGER,
    isOn: DataTypes.BOOLEAN,
    hit: DataTypes.INTEGER,
  }, {});
  Rule.associate = function(models) {
    // associations can be defined here
    Rule.hasMany(models.Match, {
      as: 'Match',
      foreignKey: {
        name: 'ruleId',
        allowNull: true
	  },
      onDelete: 'CASCADE'
    });

    Rule.hasMany(models.Filter, {
      as: 'Filter',
      foreignKey: {
        name: 'ruleId',
        allowNull: true
	  },
      onDelete: 'CASCADE'
    });

    Rule.hasMany(models.Action, {
      as: 'Action',
      foreignKey: {
        name: 'ruleId',
        allowNull: true
	  },
      onDelete: 'CASCADE'
    });

    Rule.hasMany(models.Source, {
      as: 'Source',
      foreignKey: {
        name: 'ruleId',
        allowNull: true
	  },
      onDelete: 'CASCADE'
    });

    return Rule;
};
