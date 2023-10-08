export interface IRegisterMutation {
  username: string;
  displayName: string;
  password: string;
}

export interface ILoginMutation {
  username: string;
  password: string;
}

export interface IUser {
  displayName: string;
  token: string;
}

export interface IRegisterResponse {
  user: IUser;
  message: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      message: string;
      name: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface IGlobalError {
  error: string;
}

export interface IConnectedUser {
  username: string;
  displayName: string;
}

export interface IIncomingMessage {
  type: string;
  payload: {
    userList?: IConnectedUser[];
    newUser: IConnectedUser;
  };
}
