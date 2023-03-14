import ProductModel from '../models/product.model';
import { INewProduct } from '../interfaces/product.interface';
import StatusCodes from '../utils/statusCodes';
import { ICreateProduct } from '../interfaces/return.interface';
import ValidationsInputs from './validations/validationsInputs';

export default class ProductService {
  #model: ProductModel = new ProductModel();

  #validationsInputs: ValidationsInputs = new ValidationsInputs();

  create = async (product: INewProduct): Promise<ICreateProduct> => {
    const error = this.#validationsInputs.validateNewProduct(product);
    if (error.message) return error;
    const productExist = await this.#model.getByName(product.name);
    if (productExist) return { status: StatusCodes.CONFLICT, message: 'Product already exists' };
    const newProduct = await this.#model.create(product);
    return { message: '', status: StatusCodes.CREATED, product: newProduct };
  };
}