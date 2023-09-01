'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    
  }
  Todos.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        isEmpty : false
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        isEmail : false
      },
    },
    duedate: {
      type: DataTypes.DATE,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium','high'),
    },
  }, {
    sequelize,
    modelName: 'Todos',
  });
  return Todos;
};