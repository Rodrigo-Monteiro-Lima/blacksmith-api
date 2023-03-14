import { INewOrder, IOrder } from '../interfaces/order.interface';
import OrderModel from '../models/order.model';
import StatusCodes from '../utils/statusCodes';
import ValidationsInputs from './validations/validationsInputs';
import ProductModel from '../models/product.model';
import { ICreateOrder } from '../interfaces/return.interface';

export default class OrderService {
  #orderModel: OrderModel = new OrderModel();

  #productModel: ProductModel = new ProductModel();

  #validationsInputs: ValidationsInputs = new ValidationsInputs();

  getAll = async (): Promise<IOrder[]> => {
    const orders = await this.#orderModel.getAll();
    return orders;
  };

  create = async (order: INewOrder, userId: number): Promise<ICreateOrder> => {
    const { productsIds } = order;
    const error = this.#validationsInputs.validateNewOrder(order);
    if (error.message) return error;
    const getProducts = productsIds.map(async (id) => this.#productModel.getById(id));
    const resolveGetById = await Promise.all(getProducts);
    const productExist = resolveGetById.findIndex((product) => !product); 
    if (productExist !== -1) {
      return { status: StatusCodes.NOT_FOUND, message: `productId[${productExist}] not found` };
    }
    const orderId = await this.#orderModel.create(userId);
    const productsRegistration = productsIds
      .map(async (id) => this.#productModel.update(orderId, id));
    const resolveRegistration = await Promise.all(productsRegistration);
    const isFailed = resolveRegistration.find((affectedRows) => affectedRows === 0);
    if (isFailed) return { status: 500, message: 'Erro has occurred' }; 
    return { message: '', status: StatusCodes.CREATED, order: { userId, productsIds } };
  };
}