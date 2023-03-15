import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IAuthToken, IJwtPayload } from '../interfaces/auth.interface';

dotenv.config();

export default class Token {
  #jwt;

  #secret: string;

  #options: SignOptions;

  constructor() {
    this.#jwt = jwt;
    this.#secret = process.env.JWT_SECRET || 'secret';
    this.#options = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };
  }

  generateToken(payload: IJwtPayload) {
    return this.#jwt.sign(payload, this.#secret, this.#options);
  }

  authToken(token: string): IAuthToken {
    const validateToken = this.#jwt.verify(token, this.#secret);
    return validateToken as IAuthToken;
  }
}