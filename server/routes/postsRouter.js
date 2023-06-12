const express = require('express');
const { Post } = require('../db/models');

const postsRouter = express.Router();

postsRouter.get('/:treadId', async (req, res) => {
  try {
    const { treadId } = req.params;
    const treadPosts = await Post.findAll({
      where: { tread_id: treadId },
    });
    return res.json(treadPosts);
  } catch {
    return res.sendStatus(500);
  }
});

postsRouter.post('/:treadId', async (req, res) => {
    try {
        const { treadId } = req.params.input;
        const { posttitle, postbody, postimg } = req.body;
        const userId = req.session.user.id
        const newPost = await Post.create({tread_id: treadId, user_id: userId, posttitle, postbody, postimg});
        return res.json(newPost);
    } catch {
        return res.sendStatus(500);
    }
});

postsRouter.patch('/:id', async (req, res) => {
    try {
    const { id } = req.params;
    await Post.update({ body: req.body.input }, { where: { id } });
    const post = await Post.findByPk(id);
    return res.json(post);
} catch {
    return res.sendStatus(500);
}
  });

postsRouter.delete('/:id', async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } });
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = postsRouter;
