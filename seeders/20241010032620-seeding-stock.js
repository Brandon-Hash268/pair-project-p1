'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let data = require("../data/stocks.json").map(e =>{
    return{
      ...e,
      createdAt:new Date(),
      updatedAt:new Date()
    }
   })
  //  await queryInterface.bulkInsert("Stocks",data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Stocks")
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
