'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        unique: true,
      },
      description: {
        type: Sequelize.STRING
      },
      duedate: {
        type: Sequelize.DATE
      },
      priority: {
        type: Sequelize.ENUM('low','medium','high'),
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
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
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Todos');
  }
};