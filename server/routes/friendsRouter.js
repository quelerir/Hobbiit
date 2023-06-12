const express = require('express');
const { User, FriendShip } = require('../db/models');

const friendsRouter = express.Router();

friendsRouter.get('/:id', async (req, res) => {
  try {
  const { id } = req.params;
  const objectUser = await User.findAll({
    where: { id },
    include: 'SubjectUsers',
  });

  const friends = objectUser[0]?.SubjectUsers?.map((item) => item.dataValues);

  return res.json(friends);
} catch {
  return res.sendStatus(500);
}})

friendsRouter.post('/:id', async (req, res) => {
try{
const { id } = req.params;
const sessionId = req.session.user.id;
await FriendShip.findOrCreate(
  {where: { 
    subjectuser_id: sessionId,
    objectuser_id: id
  }})
return res.sendStatus(200);
} catch {
  return res.sendStatus(500);
}})

friendsRouter.post('/:id', async (req, res) => {
  try{
  const { id } = req.params;
  const sessionId = req.session.user.id;
  await FriendShip.findOrCreate(
    {where: { 
      subjectuser_id: sessionId,
      objectuser_id: id
    }})
  return res.sendStatus(200);
  } catch {
    return res.sendStatus(500);
  }})

  friendsRouter.delete('/:id', async (req, res) => {
    try{
    const { id } = req.params;
    const sessionId = req.session.user.id;
    await FriendShip.destroy(
      {where: { 
        subjectuser_id: sessionId,
        objectuser_id: id
      }})
    return res.sendStatus(200);
    } catch {
      return res.sendStatus(500);
    }  

})

module.exports = friendsRouter;
