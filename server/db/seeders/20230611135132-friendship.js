

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Friendships',
      [
        {
          subjectuser_id: 1,
          objectuser_id: 2,
        },
        {
          subjectuser_id: 2,
          objectuser_id: 1,
        },
        {
          subjectuser_id: 2,
          objectuser_id: 3,
        },
        {
          subjectuser_id: 3,
          objectuser_id: 2,
        },
        {
          subjectuser_id: 1,
          objectuser_id: 3,
        },  
        {
          subjectuser_id: 3,
          objectuser_id: 1,
        },
      ],
          {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Friendships', null, {});
  }
};
