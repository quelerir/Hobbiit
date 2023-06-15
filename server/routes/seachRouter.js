const express = require('express');
const { literal } = require('sequelize');
const { User, Tread } = require('../db/models');

const searchRouter = express.Router();

searchRouter.post('/results', async (req, res) => {
  const { input } = req.body;
  try {
    if (!input) return res.sendStatus(400);
    const users = await User.findAll({
      where: literal(
        `LOWER(lastname) LIKE '${input.toLowerCase()}%' OR LOWER(firstname) LIKE '${input.toLowerCase()}%'`,
      ),
    });
    const treads = await Tread.findAll({
      where: literal(`LOWER(treadtitle) LIKE '${input.toLowerCase()}%'`),
    });
    res.status(200).json({ users, treads });
  } catch (e) {
    console.log(e);
  }
});

module.exports = searchRouter;
