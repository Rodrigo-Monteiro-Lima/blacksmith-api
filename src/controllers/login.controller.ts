import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces/user.interface';
import LoginService from '../services/login.service';

export default class LoginController {
  #loginService: LoginService = new LoginService();

  login = async (req: Request<object, object, ILogin>, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const user = await this.#loginService.login(body);
      if (user.message) return next(user);
      const { status, token } = user;
      return res.status(status).json({ token });
    } catch (error: unknown) {
      return next({ message: (error as Error).message });
    }
  }; 
}