/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
    'Treads',
      [
        {
          treadtitle: 'Любители Hash-таблиц',
          treadbody: 'Хеш-таблицы - структуры данных, реализующие абстрактный тип данных ассоциативный массив, т.е. структуры, которые связывают ключи со значениями. Хеш-таблицы используют хеш-функцию для вычисления индекса в массиве, в котором может быть найдено желаемое значение.',
          treadimg: 'https://bestprogrammer.ru/wp-content/uploads/2021/06/realizatsiya-hesh-tablits-v-JavaScript-696x400.jpg',
          user_id: 1,
        },
      ],
          {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Treads', null, {});
  }
};
