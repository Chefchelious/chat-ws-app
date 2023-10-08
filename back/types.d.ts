import { WebSocket } from 'ws';

export interface IUser {
  username: string;
  displayName: string;
  password: string;
  token: string;
}

export interface ActiveConnections {
  [id: string]: WebSocket;
}

export interface IMessage {
  text: string;
  authorName: string;
  authorUsername: string;
}

export interface IConnectedUser {
  username: string;
  displayName: string;
}

export interface IIncomingMessage {
  type: string;
  payload: IMessage;
}
