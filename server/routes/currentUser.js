const express = require('express');
const { User } = require('../db/models');

const currentUserRouter = express.Router();

currentUserRouter.get('/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const currentUser = await User.findOne({
        where: {id},
    });
    return res.json(currentUser);
    } catch {
    return res.status(500);
    }
   });

   module.exports = currentUserRouter;