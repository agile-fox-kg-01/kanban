'use strict';
const fs = require('fs');
const categories = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
  .map(category => {
    category.createdAt = new Date()
    category.updatedAt = new Date()
    return category
  })
// console.log(categories)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Categories', categories)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Categories', null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
