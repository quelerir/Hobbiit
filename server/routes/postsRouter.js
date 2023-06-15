const express = require('express');
const multer = require('multer');
const { Post, User, Like } = require('../db/models');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../client/public/photo'); // Измените путь к папке, где вы хотите сохранить фото
  },
  filename(req, file, cb) {
    cb(null, file.originalname); // Сохраняйте файл с его исходным именем
  },
});

const upload = multer({ storage });

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

postsRouter.post('/:treadId', upload.single('avatar'), async (req, res) => {
  try {
    const { treadId } = req.params;
    const { posttitle, postbody } = req.body;
    const userId = req.session.user.id;
    const newPost = await Post.create({
      tread_id: treadId,
      user_id: userId,
      posttitle,
      postbody,
      postimg: `../photo/${req.file.originalname}`,
    });
    const post = await Post.findOne({
      where: { id: newPost.id },
      include: { model: User },
    });
    return res.json(post);
  } catch (err) {
    console.log(err);
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
    // const post = await Post.findOne({
    //   where: { id: req.params.id },
    // });
    // await post.destroy();
    await Post.destroy({ where: { id: req.params.id } });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = postsRouter;
