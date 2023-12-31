import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      displayName: req.body.displayName,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();
    return res.send({
      message: 'Success!',
      user: {
        displayName: user.displayName,
        token: user.token,
        username: user.username,
      },
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send({ error: 'Wrong password or username!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Wrong password or username!' });
    }

    user.generateToken();
    await user.save();

    return res.send({
      message: 'Username and password correct!',
      user: {
        displayName: user.displayName,
        token: user.token,
        username: user.username,
      },
    });
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = { message: 'Success' };

    if (!token) return res.send(success);

    const user = await User.findOne({ token });

    if (!user) return res.send(success);

    user.generateToken();
    user.save();

    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
