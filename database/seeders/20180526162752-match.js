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
    return queryInterface.bulkInsert('Matchs', [{
      id: 1,
      ruleId: 1,
      name: 'match-01',
      type: 'json',
      from: 'I from am match-01',
      operator: 'json',
      what: 'I am what match-01',	
      createdAt: '2018-05-26T16:25:10.780Z',
      updatedAt: '2018-05-26T16:25:10.780Z'
    },
		{
      id: 2,
      ruleId: 2,
      name: 'match-02',
      type: 'json',
      from: 'I from am match-02',
      operator: 'json',
      what: 'I am what match-02',	
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
