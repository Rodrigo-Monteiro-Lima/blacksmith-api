import { NextFunction, Request, Response } from 'express';
import IReq from '../interfaces/req.interface';
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

  create = async (req: IReq, res: Response, next: NextFunction) => {
    try {
      const { body, user } = req;
      const { message, status, order } = await this.#orderService
        .create(body, user?.id as number);
      if (message) return next({ message, status });
      return res.status(status).json(order);
    } catch (error: any) {
      return next({ message: error.message });
    }
  };
}