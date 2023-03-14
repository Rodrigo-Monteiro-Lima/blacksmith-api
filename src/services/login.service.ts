import LoginModel from '../models/login.model';
import ValidationsInputs from './validations/validationsInputs';
import { ILogin } from '../interfaces/user.interface';
import StatusCodes from '../utils/statusCodes';
import Token from '../utils/jwt';
import { ICreateToken } from '../interfaces/return.interface';

export default class LoginService {
  #model: LoginModel = new LoginModel();

  #validationsInputs: ValidationsInputs = new ValidationsInputs();

  #token: Token = new Token();

  login = async (user: ILogin): Promise<ICreateToken> => {
    const error = this.#validationsInputs.validateLogin(user);
    if (error.message) return error;
    const { username: name, password } = user;
    const userLogin = await this.#model.login(name);
    if (!userLogin || userLogin.password !== password) {
      return { 
        message: 'Username or password invalid', 
        status: StatusCodes.UNAUTHORIZED, 
      };
    }
    const { password: unusedPassword, ...rest } = userLogin;
    const token = this.#token.generateToken(rest);
    return { message: '', status: StatusCodes.OK, token };
  };
}