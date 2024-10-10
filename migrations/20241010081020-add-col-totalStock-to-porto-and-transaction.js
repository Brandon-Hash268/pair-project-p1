'use strict';

const { query } = require('express');
const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Portofolios","totalStock",{
      type:Sequelize.INTEGER,
      defaultValue:0
    })
    await queryInterface.addColumn("Transactions","totalStock",{
      type:Sequelize.INTEGER,
      defaultValue:0
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Portofolios","totalStock")
    await queryInterface.removeColumn("Transactions","totalStock")
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
