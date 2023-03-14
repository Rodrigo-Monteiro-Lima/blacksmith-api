import ValidationsSchemas from './schemas';
import { INewProduct } from '../../interfaces/product.interface';
import StatusCodes from '../../utils/statusCodes';
import { INewUSer } from '../../interfaces/user.interface';

export default class ValidationsInputs {
  #validationsSchemas = new ValidationsSchemas();

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
}