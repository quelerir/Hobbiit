const express = require('express');
const { User } = require('../db/models');

const friendsRouter = express.Router();

friendsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const objectUser = await User.findAll({
    where: { id },
    include: 'SubjectUsers',
  });

  const friends = objectUser[0]?.SubjectUsers?.map((item) => item.dataValues);

  res.json(friends);
});

module.exports = friendsRouter;
