import ValidationsSchemas from './schemas';
import { INewProduct } from '../../interfaces/product.interface';
import StatusCodes from '../../utils/statusCodes';
import { ILogin, INewUSer } from '../../interfaces/user.interface';
import { INewOrder } from '../../interfaces/order.interface';

export default class ValidationsInputs {
  #validationsSchemas;

  constructor() {
    this.#validationsSchemas = new ValidationsSchemas();
  }

  validateNewProduct = (product: INewProduct) => {
    const { error } = this.#validationsSchemas.productSchema.validate(product);
    const status = error?.message.includes('required') ? StatusCodes.BAD_REQUEST
      : StatusCodes.UNPROCESSABLE_CONTENT;
    if (error) return { status, message: error.message };
    return { status: StatusCodes.CREATED, message: '' };
  };

  validateNewUser = (user: INewUSer) => {
    const { error } = this.#validationsSchemas.userSchema.validate(user);
    const status = error?.message.includes('required') ? StatusCodes.BAD_REQUEST
      : StatusCodes.UNPROCESSABLE_CONTENT;
    if (error) return { status, message: error.message };
    return { status: StatusCodes.CREATED, message: '' };
  };

  validateLogin = (login: ILogin) => {
    const { error } = this.#validationsSchemas.loginSchema.validate(login);
    if (error) return { status: StatusCodes.BAD_REQUEST, message: error.message };
    return { status: StatusCodes.CREATED, message: '' };
  };

  validateNewOrder = (order: INewOrder) => {
    const { error } = this.#validationsSchemas.orderSchema.validate(order);
    const status = error?.message.includes('required') ? StatusCodes.BAD_REQUEST 
      : StatusCodes.UNPROCESSABLE_CONTENT;
    if (error) return { status, message: error.message };
    return { status: StatusCodes.CREATED, message: '' };
  };
}