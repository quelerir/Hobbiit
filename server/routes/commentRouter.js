const express = require('express');
const { Comment, User } = require('../db/models');

const commentsRouter = express.Router();

commentsRouter.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const postComments = await Comment.findAll({
      where: { post_id: postId },
    });
    console.log(postComments, '++++++++++');
    return res.json(postComments);
  } catch {
    return res.sendStatus(500);
  }
});

commentsRouter.post('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { commentbody } = req.body;
    console.log(commentbody, '===============');
    const userId = req.session.user.id;
    const newComment = await Comment.create({ post_id: postId, user_id: userId, commentbody });
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
    const comment = await Comment.findByPk(id);
    return res.json(comment);
  } catch {
    return res.sendStatus(500);
  }
});

commentsRouter.delete('/:id', async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.id } });
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = commentsRouter;
