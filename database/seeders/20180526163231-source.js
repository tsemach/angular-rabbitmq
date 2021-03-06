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
		return queryInterface.bulkInsert('Sources', [{
			id: 1,
			ruleId: 1,
			name: 'source-1-1',
			createdAt: '2018-05-26T16:25:10.780Z',
			updatedAt: '2018-05-26T16:25:10.780Z'
    },
		{
			id: 2,
			ruleId: 1,
			name: 'source-1-2',
			createdAt: '2018-05-26T16:25:10.780Z',
			updatedAt: '2018-05-26T16:25:10.780Z'
    },
    {
			id: 3,
			ruleId: 2,
			name: 'source-2-2',
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
