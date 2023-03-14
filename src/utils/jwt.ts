import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IAuthToken, IJwtPayload } from '../interfaces/auth.interface';

dotenv.config();

export default class Token {
  #jwt = jwt;

  #secret: string = process.env.JWT_SECRET || 'secret';

  #options: SignOptions = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  generateToken(payload: IJwtPayload) {
    return this.#jwt.sign(payload, this.#secret, this.#options);
  }

  authToken(token: string): IAuthToken {
    const validateToken = this.#jwt.verify(token, this.#secret);
    return validateToken as IAuthToken;
  }
}