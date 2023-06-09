const express = require('express');
const { Op } = require('sequelize');
const { Messages } = require('../db/models');

const chatRouter = express.Router();

chatRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user.id;
  const messages = await Messages.findAll({
    where: {
      [Op.or]: [
        { subjectchatuser_id: userId, objectchatuser_id: id },
        { subjectchatuser_id: id, objectchatuser_id: userId },
      ],
    },
  });
  res.json(messages);
});

chatRouter.post('/addmessage/:id', async (req, res) => {
  const { id } = req.params;
  console.log('params', id);
  const userId = req.session.user.id;
  console.log('user id', userId);
  const { message } = req.body;
  console.log(message);

  const newMessage = await Messages.create({
    message,
    subjectchatuser_id: userId,
    objectchatuser_id: id,
  });
  res.json(newMessage);
});

module.exports = chatRouter;
