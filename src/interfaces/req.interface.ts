import { Request } from 'express';
import { IAuthToken } from './auth.interface';
import { INewOrder } from './order.interface';

export default interface IReq extends Request {
  user?: IAuthToken; 
  body: INewOrder;
}