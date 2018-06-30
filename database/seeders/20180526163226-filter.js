'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Filters', [{
      id: 1,
      ruleId: 1,
      name: 'filter-01',
      type: 'json',
      from: 'I from am filter-01',
      operator: 'json',
      what: 'I am what filter-01',	
      createdAt: '2018-05-26T16:25:10.780Z',
      updatedAt: '2018-05-26T16:25:10.780Z'
    },
		{
      id: 2,
      ruleId: 2,
      name: 'filter-02',
      type: 'json',
      from: 'I from am filter-02',
      operator: 'json',
      what: 'I am what filter-02',	
      createdAt: '2018-05-26T16:25:10.780Z',
      updatedAt: '2018-05-26T16:25:10.780Z'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
