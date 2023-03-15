import { IRegisterProduct } from './product.interface';

export interface IReturn {
  status: number;
  message: string;
} 

export interface ICreateProduct extends IReturn {
  product?: IRegisterProduct;
}

export interface ICreateToken extends IReturn {
  token?: string;
}

export interface ICreateOrder extends IReturn {
  order?: { userId: number, productsIds:Array<number> }
}
