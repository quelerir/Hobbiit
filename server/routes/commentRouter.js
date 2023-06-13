const express = require('express');
const { Comment, User } = require('../db/models');

const commentsRouter = express.Router();

commentsRouter.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const postComments = await Comment.findAll({
      where: { post_id: postId },
      include: { model: User },
      order: [['id', 'DESC']],
    });
    return res.json(postComments);
  } catch (err) {
    return res.sendStatus(500);
  }
});

commentsRouter.post('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { commentbody } = req.body;
    const userId = req.session.user.id;
    const comment = await Comment.create({ post_id: postId, user_id: userId, commentbody });
    const newComment = await Comment.findOne({
      where: { id: comment.id },
      include: { model: User },
    });
    return res.json(newComment);
  } catch {
    return res.sendStatus(500);
  }
});

commentsRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { commentbody } = req.body;
    await Comment.update({ commentbody }, { where: { id } });
    const comment = await Comment.findOne({
      where: { id },
      include: { model: User },
    });
    return res.json(comment);
  } catch {
    return res.sendStatus(500);
  }
});

commentsRouter.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } });
    await comment.destroy();
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = commentsRouter;
