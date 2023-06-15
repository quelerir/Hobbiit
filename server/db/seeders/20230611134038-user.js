/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'LK@LK',
          password: '$2b$10$yykdlVuwuyb6VpvX3nhmyO1ez/VIQRzAPRBV1ozWDbDbWCL7c4HYa',
          firstname: 'Леонид',
          lastname: 'Камаев',
          avatar: 'https://ca.slack-edge.com/T04UWAV6RD4-U052AMVV7EW-12a484939820-512',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
