const express = require('express');
const { Tread, User, Tag } = require('../db/models');

const treadsRouter = express.Router();

treadsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tread = await Tread.findOne({
      where: { id },
      include: {
        model: Tag,
        through: 'TreadsTags',
        as: 'oneTreadTags'
  }
    });
    return res.json(tread);
  } catch {
    return res.sendStatus(500);
  }
});

treadsRouter.get('/:id/subscribers', async (req, res) => {
  try {
    const { id } = req.params;
    const tread = await Tread.findOne({
      where: { id },
      include:{model: User,
        through: 'Subscribes',
        as: 'subscribers'}
    });
    return res.json(tread.subscribers);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

treadsRouter.post('/add', async (req, res) => {
  try {
      const { treadtitle, treadbody, treadimg } = req.body;
      const userId = req.session.user.id
      const newTread = await Tread.create({ user_id: userId, treadtitle, treadbody, treadimg });
      const tread = await Tread.findOne({
        where: {id: newTread.id}, 
        include: {
          model: Tag,
          through: 'TreadsTags',
          as: 'oneTreadTags'
    }
  });
      return res.json(tread);
  } catch {
      return res.sendStatus(500);
  }
});

treadsRouter.patch('/:id', async (req, res) => {
  try {
      const { treadtitle, treadbody, treadimg } = req.body;
      const { id } = req.params;
      const patchedTread = await Tread.create({ treadtitle, treadbody, treadimg }, {where: id});
      const tread = await Tread.findOne({
        where: {id: patchedTread.id}, 
        include: {
          model: Tag,
          through: 'TreadsTags',
          as: 'oneTreadTags'
    }
  });
      return res.json(tread);
  } catch {
      return res.sendStatus(500);
  }
});

treadsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Tread.destroy({ where: { id } });
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = treadsRouter;
