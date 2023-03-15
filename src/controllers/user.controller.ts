import { NextFunction, Request, Response } from 'express';
import { INewUSer } from '../interfaces/user.interface';
import UserService from '../services/user.service';

export default class UserController {
  #userService: UserService;

  constructor() {
    this.#userService = new UserService();
  }

  create = async (req: Request<object, object, INewUSer>, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const newUser = await this.#userService.create(body);
      if (newUser.message) return next(newUser);
      const { status, token } = newUser;
      return res.status(status).json({ token });
    } catch (error: unknown) {
      return next({ message: (error as Error).message });
    }
  }; 
}