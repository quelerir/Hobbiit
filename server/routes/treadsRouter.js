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

module.exports = treadsRouter;
