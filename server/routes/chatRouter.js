const express = require('express');
const { Op } = require('sequelize');
const { Messages, User } = require('../db/models');

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
    include: [
      { model: User, as: 'SubjectChatUser' },
      { model: User, as: 'ObjectChatUser' },
    ],
    order: [['createdAt', 'ASC']],
  });
  res.json(messages);
});

chatRouter.post('/addmessage/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user.id;
  const { message } = req.body;
  const newMessage = await Messages.create({
    message,
    subjectchatuser_id: userId,
    objectchatuser_id: id,
  });
  res.json(newMessage);
});

module.exports = chatRouter;
