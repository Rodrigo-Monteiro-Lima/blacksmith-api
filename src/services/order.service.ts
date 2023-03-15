import { INewOrder, IOrder } from '../interfaces/order.interface';
import OrderModel from '../models/order.model';
import StatusCodes from '../utils/statusCodes';
import ValidationsInputs from './validations/validationsInputs';
import ProductModel from '../models/product.model';
import { ICreateOrder, IReturn } from '../interfaces/return.interface';
import { IProduct } from '../interfaces/product.interface';

export default class OrderService {
  #orderModel: OrderModel;

  #productModel: ProductModel;

  #validationsInputs: ValidationsInputs;

  constructor() {
    this.#orderModel = new OrderModel();
    this.#productModel = new ProductModel();
    this.#validationsInputs = new ValidationsInputs();
  }

  getAll = async (): Promise<IOrder[]> => {
    const orders = await this.#orderModel.getAll();
    return orders;
  };

  rollback = async (prevProducts: IProduct[], newOrderId: number): Promise<IReturn> => {
    console.log(prevProducts, newOrderId);
    const rollbackProducts = prevProducts
      .map(async ({ orderId, id }) => this.#productModel.update(orderId as number, id));
    await Promise.all(rollbackProducts);
    await this.#orderModel.delete(newOrderId);
    return { status: 500, message: 'Error has occurred trying to register a new order' }; 
  };

  create = async (order: INewOrder, userId: number): Promise<ICreateOrder> => {
    const { productsIds } = order;
    const error = this.#validationsInputs.validateNewOrder(order);
    if (error.message) return error;
    const getProducts = productsIds.map(async (id) => this.#productModel.getById(id));
    const resolveGetById = await Promise.all(getProducts);
    const a = resolveGetById.filter((el) => el !== null) as IProduct[];
    const productExist = resolveGetById.findIndex((product) => !product); 
    if (productExist !== -1) {
      return { status: StatusCodes.NOT_FOUND, message: `productId[${productExist}] not found` };
    }
    const orderId = await this.#orderModel.create(userId);
    const productsRegistration = productsIds
      .map(async (id) => this.#productModel.update(orderId, id));
    const resolveRegistration = await Promise.all(productsRegistration);
    const isFailed = resolveRegistration.some((affectedRows) => affectedRows === 0);
    if (isFailed) return this.rollback(a, orderId);
    return { message: '', status: StatusCodes.CREATED, order: { userId, productsIds } };
  };

  // // eslint-disable-next-line max-lines-per-function
  // createTransaction = async (order: INewOrder, userId: number): Promise<ICreateOrder> => {
  //   const { productsIds } = order;
  //   const id: boolean | number = false;
  //   const error = this.#validationsInputs.validateNewOrder(order);
  //   if (error.message) return error;
  //   // const a = await this.#orderModel.createTransaction(userId, productsIds);
  //   console.log(a);
  //   const a = productsIds.map(async (productId, index, arr) => {
  //     console.log(arr[0]);
  //     if (index === 0) {
  //       const { insertId } = await this.#orderModel.createTransaction(productId, userId, id);
  //       id = insertId;
  //       console.log(id);
  //     } else {
  //       await this.#orderModel.createTransaction(productId, userId, id);
  //     }
  //   });
  //   await Promise.all(a);
  //   productsIds.forEach(async (productId, index) => {
  //     if (index === 0) {
  //       const { insertId } = await this.#orderModel.createTransaction(productId, userId, id);
  //       id = insertId;
  //       console.log(id);
  //     } // else {
  //     //   await this.#orderModel.createTransaction(productId, userId, id);
  //     // }
  //     console.log(id);
  //   });
  //   const orderId = await this.#orderModel.createTransaction(userId);
  //   const isFailed = resolveRegistration.find((affectedRows) => affectedRows === 0);
  //   if (isFailed) return { status: 500, message: 'Erro has occurred' }; 
  //   return { message: '', status: StatusCodes.CREATED, order: { userId, productsIds } };
  // };
}