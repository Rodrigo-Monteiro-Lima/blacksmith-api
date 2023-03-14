import { IProduct } from './product.interface';

export interface IReturn {
  status: number;
  message: string;
} 

export interface ICreateProduct extends IReturn {
  product?: IProduct;
}
