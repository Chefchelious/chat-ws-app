import express from 'express';
import { ActiveConnections, IConnectedUser, IIncomingMessage } from '../types';
import * as crypto from 'crypto';
import User from '../models/User';

const chatRouter = express.Router();

const activeConnections: ActiveConnections = {};

const users: IConnectedUser[] = [];

export const chatF = () => {
  chatRouter.ws('/', async (ws, req) => {
    const id = crypto.randomUUID();
    console.log('client connected! id=', id);
    ws.send(
      JSON.stringify({
        type: 'USER_LIST',
        payload: {
          userList: users,
        },
      }),
    );
    activeConnections[id] = ws;

    try {
      const token = req.query.token;

      if (token) {
        const user = await User.findOne({ token });

        if (!user) return;

        const existingUser = users.find((u) => u.username === user.username);

        if (existingUser) return;
        users.push({ username: user.username, displayName: user.displayName });

        Object.keys(activeConnections).forEach((key) => {
          const conn = activeConnections[key];

          conn.send(
            JSON.stringify({
              type: 'NEW_USER',
              payload: {
                newUser: {
                  username: user.username,
                  displayName: user.displayName,
                },
              },
            }),
          );
        });
      }
    } catch (e) {
      console.log(e);
    }
    console.log(users);

    ws.on('message', (msg) => {
      const decodedMessage = JSON.parse(msg.toString()) as IIncomingMessage;

      switch (decodedMessage.type) {
        default:
          console.log('Unknown message type', decodedMessage.type);
      }
    });

    ws.on('close', () => {
      console.log('client disconnected! id=', id);
      delete activeConnections[id];
    });
  });
};

export default chatRouter;
