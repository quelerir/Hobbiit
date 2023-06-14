const express = require('express');
const { Post, User, Like } = require('../db/models');

const postsRouter = express.Router();

postsRouter.get('/:treadId', async (req, res) => {
  try {
    const { treadId } = req.params;
    const treadPosts = await Post.findAll({
      where: { tread_id: treadId },
      include: [{ model: User }, { model: Like }],
    });
    return res.json(treadPosts);
  } catch {
    return res.sendStatus(500);
  }
});

postsRouter.post('/:treadId', async (req, res) => {
  try {
    const { treadId } = req.params;
    const { posttitle, postbody, postimg } = req.body;
    const userId = req.session.user.id;
    const newPost = await Post.create({
      tread_id: treadId,
      user_id: userId,
      posttitle,
      postbody,
      postimg,
    });
    const post = await Post.findOne({
      where: { id: newPost.id },
      include: { model: User },
    });
    return res.json(post);
  } catch {
    return res.sendStatus(500);
  }
});

postsRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { posttitle, postbody, postimg } = req.body;
    await Post.update({ posttitle, postbody, postimg }, { where: { id } });
    const post = await Post.findOne({
      where: { id },
      include: { model: User },
    });
    return res.json(post);
  } catch {
    return res.sendStatus(500);
  }
});

postsRouter.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
    });
    await post.destroy();
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = postsRouter;
