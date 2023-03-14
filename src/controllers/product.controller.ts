import { NextFunction, Request, Response } from 'express';
import { INewProduct } from '../interfaces/product.interface';
import ProductService from '../services/product.service';

export default class ProductController {
  #productService = new ProductService();

  create = async (req: Request<object, object, INewProduct>, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const newProduct = await this.#productService.create(body);
      if (newProduct.message) return next(newProduct);
      const { status, product } = newProduct;
      return res.status(status).json(product);
    } catch (error: any) {
      return next({ message: error.message });
    }
  };
}