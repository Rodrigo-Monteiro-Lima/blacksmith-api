export interface ILogin {
  username: string;
  password: string
}

export interface INewUSer extends ILogin {
  vocation: string;
  level: number;
}

export interface IUser extends INewUSer {
  id: number;
}