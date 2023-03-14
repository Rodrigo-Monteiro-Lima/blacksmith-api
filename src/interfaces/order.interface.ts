export interface INewOrder {
  productsIds: Array<number>;
}

export interface IOrder extends INewOrder {
  id: number;
  userId: number;
  
}
