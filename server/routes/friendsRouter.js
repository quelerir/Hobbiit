const express = require('express');
const { User, Friendship } = require('../db/models');

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
  const [frendship, created] = await Friendship.findOrCreate(
    {where: { 
      subjectuser_id: sessionId,
      objectuser_id: id
    }})
    if (created) {
      const user = await User.findOne({where: {id}});
      return res.json(user);
    }
  return res.status(409);
  } catch {
    return res.sendStatus(500);
  }})

  friendsRouter.delete('/:id', async (req, res) => {
    console.log('_____________666______________________________');
    try{
    const { id } = req.params;
    const sessionId = req.session.user.id;
    console.log(id);
    console.log(sessionId);
    const friend = await Friendship.findOne(
      {where: { 
        subjectuser_id: sessionId,
        objectuser_id: Number(id),
      }})
      await friend.destroy();
      console.log(friend.id);
    return res.json(friend.id);
    } catch(err) {
      console.error(err);
      return res.sendStatus(500);
    }  
    
})

module.exports = friendsRouter;
