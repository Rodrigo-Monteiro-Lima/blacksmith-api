export interface INewProduct {
  name: string,
  amount: string,
}

export interface IProduct extends INewProduct {
  id: number,
  orderId: number,
}

export interface IRegisterProduct extends INewProduct {
  id: number,
}