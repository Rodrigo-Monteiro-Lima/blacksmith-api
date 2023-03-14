import UserModel from '../models/user.model';
import { INewUSer } from '../interfaces/user.interface';
import StatusCodes from '../utils/statusCodes';
import Token from '../utils/jwt';
import { ICreateToken } from '../interfaces/return.interface';

export default class UserService {
  #model: UserModel = new UserModel();

  #token: Token = new Token();

  create = async (user: INewUSer): Promise<ICreateToken> => {
    const userExist = await this.#model.getByUsername(user.username, user.vocation);
    if (userExist) return { status: StatusCodes.CONFLICT, message: 'User already exists' };
    const newUser = await this.#model.create(user);
    const { password, ...rest } = newUser;
    const token = this.#token.generateToken(rest);
    return { message: '', status: StatusCodes.CREATED, token };
  };
}