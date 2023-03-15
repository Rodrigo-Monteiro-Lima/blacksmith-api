import { NextFunction, Response } from 'express';
import IReq from '../interfaces/req.interface';
import Token from '../utils/jwt';
import StatusCodes from '../utils/statusCodes';

export default class AuthMiddleware {
  #token: Token;

  constructor() {
    this.#token = new Token();
  }

  auth = (req: IReq, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return next({ message: 'Token not found', status: StatusCodes.UNAUTHORIZED });
    try {
      const user = this.#token.authToken(token);
      req.user = user;
      return next();
    } catch (error) {
      return next({ message: 'Invalid token', status: StatusCodes.UNAUTHORIZED });
    }
  };
}