const express = require('express');
const { Subscribe, User } = require('../db/models');

const subscriberRouter = express.Router();

subscriberRouter.post('/:treadId', async (req, res) => {
    try {
    const { treadId } = req.params;
    const userId = req.session.user.id;
    const findSubscribe = await Subscribe.findOne({where: {user_id: userId, tread_id: treadId}});
    if(findSubscribe){
      return res.status(409).json({ message: "Subscribe already exists" });
    }
    await Subscribe.create({user_id: userId, tread_id: treadId})
    const newSubscriber = await User.findOne(
        {where: {id: userId}}
    )
    return res.json(newSubscriber);
    } catch {
      return res.sendStatus(500);
  }
});

subscriberRouter.delete('/:treadId', async (req, res) => {
    try { 
    const { treadId } = req.params;
    const userId = req.session.user.id;
    await Subscribe.destroy({ where: {user_id: userId, tread_id: treadId}})
    const deletedSubscriber = await User.findOne(
        {where: {id: userId}}
    )
    return res.json(deletedSubscriber);
    } catch {
      return res.sendStatus(500);
  }
});

module.exports = subscriberRouter;