import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/usersRouter';
import expressWs from 'express-ws';
import chatRouter, { chatF } from './routers/chatRouter';

const app = express();
const port = 8000;

app.use(cors());
expressWs(app);
chatF();
app.use(express.json());
app.use('/users', usersRouter);
app.use('/chat', chatRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`port is running at ${port} port`);
  });
};

run().catch((e) => console.error(e));
