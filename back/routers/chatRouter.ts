import express from 'express';
import { ActiveConnections, IConnectedUser, IIncomingMessage, IMessage } from '../types';
import * as crypto from 'crypto';
import User from '../models/User';
import Message from '../models/Message';

const chatRouter = express.Router();

const activeConnections: ActiveConnections = {};

let users: IConnectedUser[] = [];

export const chatF = () => {
  chatRouter.ws('/', async (ws, req) => {
    const id = crypto.randomUUID();
    console.log('client connected! id=', id);

    const messages: IMessage[] = await Message.find().sort({ datetime: -1 }).limit(30);

    ws.send(
      JSON.stringify({
        type: 'ALL_MESSAGES',
        payload: messages.reverse(),
      }),
    );

    ws.send(
      JSON.stringify({
        type: 'USER_LIST',
        payload: users,
      }),
    );
    activeConnections[id] = ws;

    try {
      if (req.query.token) {
        const user = await User.findOne({ token: req.query.token });

        if (!user) return;

        const existingUser = users.find((u) => u.username === user.username);

        if (!existingUser) {
          users.push({ username: user.username, displayName: user.displayName, connectionId: id });
          Object.keys(activeConnections).forEach((key) => {
            const conn = activeConnections[key];

            conn.send(
              JSON.stringify({
                type: 'NEW_USER',
                payload: {
                  username: user.username,
                  displayName: user.displayName,
                },
              }),
            );
          });
        }
      }
    } catch (e) {
      console.error(e);
    }

    ws.on('message', async (msg) => {
      const decodedMessage = JSON.parse(msg.toString()) as IIncomingMessage;

      switch (decodedMessage.type) {
        case 'SEND_MESSAGE':
          Object.keys(activeConnections).forEach((key) => {
            const conn = activeConnections[key];

            conn.send(
              JSON.stringify({
                type: 'NEW_MESSAGE',
                payload: {
                  text: decodedMessage.payload.text,
                  authorName: decodedMessage.payload.authorName,
                  authorUsername: decodedMessage.payload.authorUsername,
                },
              }),
            );
          });

          try {
            const message = new Message({
              text: decodedMessage.payload.text,
              authorName: decodedMessage.payload.authorName,
              authorUsername: decodedMessage.payload.authorUsername,
            });

            await message.save();
          } catch (e) {
            console.log(e);
          }
          break;

        default:
          console.log('Unknown message type', decodedMessage.type);
      }
    });

    ws.on('close', () => {
      users = users.filter((u) => u.connectionId !== id);
      Object.keys(activeConnections).forEach((key) => {
        const conn = activeConnections[key];

        conn.send(
          JSON.stringify({
            type: 'USER_LOGOUT',
            payload: users,
          }),
        );
      });

      console.log('client disconnected! id=', id);
      delete activeConnections[id];
    });
  });
};

export default chatRouter;
