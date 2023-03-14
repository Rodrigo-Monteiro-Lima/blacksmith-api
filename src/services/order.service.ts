import { IOrder } from '../interfaces/order.interface';
import OrderModel from '../models/order.model';

export default class OrderService {
  #orderModel: OrderModel = new OrderModel();

  getAll = async (): Promise<IOrder[]> => {
    const orders = await this.#orderModel.getAll();
    return orders;
  };
}