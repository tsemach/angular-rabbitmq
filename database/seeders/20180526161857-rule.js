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
    return queryInterface.bulkInsert('Rules', [{
      id: 1,
      name: 'rule-01',
      userId: 0,
      groupId: 0,
      isOn: true,
      hit: -1,			
      createdAt: '2018-05-26T16:25:10.780Z',
      updatedAt: '2018-05-26T16:25:10.780Z'
    },
		{
      id: 2,
      name: 'rule-02',
      userId: 0,
      groupId: 0,
      isOn: true,
      hit: -1,			
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
