

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          email: 'LK@LK',
          password: '$2b$10$yykdlVuwuyb6VpvX3nhmyO1ez/VIQRzAPRBV1ozWDbDbWCL7c4HYa',
          firstname: 'Леонид',
          lastname: 'Камаев',
          avatar: 'https://ca.slack-edge.com/T04UWAV6RD4-U052AMVV7EW-12a484939820-512',
        },
        {
          id: 2,
          email: 'AU@AU',
          password: '$2b$10$f0AtWIM/yiVsSSIE0yeNDeeaVGv8S/3/Ky4ZSmqDkiX.Q3dVDjJW6',
          firstname: 'Антон',
          lastname: 'Юсупов',
          avatar: 'https://ca.slack-edge.com/T04UWAV6RD4-U04V31KU01G-3adfb3cfe4c1-512',
        },
        {
          id: 3,
          email: 'AG@AG',
          password: '$2b$10$8KvFAhlI65pzaSPPwOizZORQpPtFPQ4n4vqzpd5NIa1wym70p9Aue',
          firstname: 'Алексей',
          lastname: 'Голиков',
          avatar: 'https://ca.slack-edge.com/T04UWAV6RD4-U04V5F2ST8U-f2d11ed67d61-512',
        },
      ],
      {},
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
