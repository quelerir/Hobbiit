const express = require('express');
const { Tread } = require('../db/models');

const treadsRouter = express.Router();

treadsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tread = await Tread.findOne({
      where: { id },
    });
    return res.json(tread);
  } catch {
    return res.sendStatus(500);
  }
});

treadsRouter.post('/add', async (req, res) => {
  try {
      const { treadtitle, treadbody, treadimg } = req.body;
      const userId = req.session.user.id
      const newTread = await Tread.create({ user_id: userId, treadtitle, treadbody, treadimg });
      return res.json(newTread);
  } catch {
      return res.sendStatus(500);
  }
});

treadsRouter.patch('/:id', async (req, res) => {
  try {
      const { treadtitle, treadbody, treadimg } = req.body;
      const { id } = req.params;
      const tread = await Tread.create({ treadtitle, treadbody, treadimg }, {where: id});
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
