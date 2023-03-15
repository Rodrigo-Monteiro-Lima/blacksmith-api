import { NextFunction, Request, Response } from 'express';
import { INewProduct } from '../interfaces/product.interface';
import ProductService from '../services/product.service';
import StatusCodes from '../utils/statusCodes';

export default class ProductController {
  #productService = new ProductService();

  create = async (req: Request<object, object, INewProduct>, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const newProduct = await this.#productService.create(body);
      if (newProduct.message) return next(newProduct);
      const { status, product } = newProduct;
      return res.status(status).json(product);
    } catch (error: unknown) {
      return next({ message: (error as Error).message });
    }
  };

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.#productService.getAll();
      return res.status(StatusCodes.OK).json(products);
    } catch (error: unknown) {
      return next({ message: (error as Error).message });
    }
  };
}