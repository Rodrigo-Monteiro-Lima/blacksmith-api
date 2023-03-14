import { NextFunction, Request, Response } from 'express';
import OrderService from '../services/order.service';
import StatusCodes from '../utils/statusCodes';

export default class OrderController {
  #orderService: OrderService = new OrderService();

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.#orderService.getAll();
      return res.status(StatusCodes.OK).json(orders);
    } catch (error: any) {
      return next({ message: error.message });
    }
  };
}