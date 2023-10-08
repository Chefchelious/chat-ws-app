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

export interface IIncomingMessage {
  type: string;
  payload: {
    token?: string;
  };
}

export interface IConnectedUser {
  username: string;
  displayName: string;
}
