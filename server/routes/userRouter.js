const express = require('express');
const bcrypt = require('bcrypt');
const { User, Tread } = require('../db/models');

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (email && password && firstname && lastname) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          firstname,
          lastname,
          password: await bcrypt.hash(password, 10),
        },
      });
      if (!created) return res.sendStatus(401);

      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      req.session.user = sessionUser;
      return res.json(sessionUser);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!(await bcrypt.compare(password, user.password))) {
        return res.sendStatus(401);
      }

      const sessionUser = JSON.parse(JSON.stringify(user));
      delete sessionUser.password;
      req.session.user = sessionUser;
      return res.json(sessionUser);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

userRouter.get('/check', (req, res) => {
  if (req.session?.user) {
    return res.json(req.session.user);
  }
  return res.sendStatus(401);
});

userRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid_socket').sendStatus(200);
});

userRouter.patch('/:id/edit', async (req, res) => {
  const { firstname, lastname, location, about } = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await User.update(
      {
        firstname,
        lastname,
        location,
        about,
      },
      { where: { id } },
    );
    if (!updatedUser) {
      return res.sendStatus(400);
    }
    const editedUser = await User.findOne({ where: { id } });

    // req.session.user = user;
    // req.session.save();
    // console.log(user);

    const { user } = req.session;
    user.firstname = firstname;
    user.lastname = lastname;
    user.location = location;
    user.about = about;
    return res.json(editedUser);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

userRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const deletedUser = await User.destroy({ where: { id } });
      if (deletedUser === 0) {
        return res.sendStatus(404);
      }
      req.session.destroy();
      return res.clearCookie('sid_socket').sendStatus(200);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(400);
});

userRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid_socket').sendStatus(200);
});

userRouter.get('/usertreads', async (req,res) => {
try{
const {id} = req.session.user;
const user = await User.findOne({
  where: { id },
  include:{model: Tread,
    through: 'Subscribes',
    as: 'userTreads'}
});
return res.json(user.userTreads)
} catch {
  return res.sendStatus(500);
}
})


module.exports = userRouter;
