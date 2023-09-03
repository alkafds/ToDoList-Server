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
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    description: {
      type: DataTypes.STRING,
    },
    duedate: {
      type: DataTypes.DATE,
    },
    priority: {
      type: DataTypes.ENUM('low','medium','high'),
      defaultValue:'medium',
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // 'false' in the database will represent 'not finished'
      get() {
        return this.getDataValue('status') ? 'finished' : 'not finished';
      },
      set(value) {
        // Map 'not finished' to 'false' and 'finished' to 'true'
        if (value === 'finished' || value === true) {
          this.setDataValue('status', true);
        } else {
          this.setDataValue('status', false);
        }
      },
    },
  }, {
    sequelize,
    modelName: 'Todos',
  });
  return Todos
};