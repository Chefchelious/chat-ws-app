import mongoose from 'mongoose';
import config from './config';
import crypto from 'crypto';
import User from './models/User';
import Message from './models/Message';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('messages');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user, user1] = await User.create(
    {
      username: 'gavtyav',
      displayName: 'Victoria',
      password: '123',
      token: crypto.randomUUID(),
    },
    {
      username: 'dim_senpai',
      displayName: 'Dmitrii',
      password: '123',
      token: crypto.randomUUID(),
    },
  );

  await Message.create(
    {
      text: 'hello',
      authorName: user.displayName,
      authorUsername: user.username,
    },
    {
      text: 'bbb',
      authorName: user.displayName,
      authorUsername: user.username,
    },
    {
      text: 'hey',
      authorName: user1.displayName,
      authorUsername: user1.username,
    },
    {
      text: 'zzz',
      authorName: user1.displayName,
      authorUsername: user1.username,
    },
  );

  await db.close();
};

run().catch(console.error);
