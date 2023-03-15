import UserModel from '../models/user.model';
import { INewUSer } from '../interfaces/user.interface';
import StatusCodes from '../utils/statusCodes';
import Token from '../utils/jwt';
import { ICreateToken } from '../interfaces/return.interface';
import ValidationsInputs from './validations/validationsInputs';

export default class UserService {
  #model: UserModel;

  #token: Token;

  #validationsInputs: ValidationsInputs;

  constructor() {
    this.#model = new UserModel();
    this.#token = new Token(); 
    this.#validationsInputs = new ValidationsInputs();
  }

  create = async (user: INewUSer): Promise<ICreateToken> => {
    const error = this.#validationsInputs.validateNewUser(user);
    if (error.message) return error;
    const userExist = await this.#model.getByUsername(user.username, user.vocation);
    if (userExist) return { status: StatusCodes.CONFLICT, message: 'User already exists' };
    const newUser = await this.#model.create(user);
    const { password, ...rest } = newUser;
    const token = this.#token.generateToken(rest);
    return { message: '', status: StatusCodes.CREATED, token };
  };
}