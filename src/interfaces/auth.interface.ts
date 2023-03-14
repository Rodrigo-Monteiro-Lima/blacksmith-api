export interface IJwtPayload {
  id: number;
  username: string;
  vocation: string;
  level: number;
}

export interface IAuthToken extends IJwtPayload {
  exp: number;
  iat: number;
}