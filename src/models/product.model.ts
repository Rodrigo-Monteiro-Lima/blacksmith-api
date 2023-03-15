import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { INewProduct, IProduct, IRegisterProduct } from '../interfaces/product.interface';
import connection from './connection';

export default class ProductModel {
  #connection;

  constructor() {
    this.#connection = connection;
  }

  create = async (product: INewProduct): Promise<IRegisterProduct> => {
    const { name, amount } = product;
    const [{ insertId }] = await this.#connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    return { id: insertId, ...product };
  };

  getByName = async (name: string): Promise<IProduct | null> => {
    const [[product]] = await this.#connection.execute<IProduct[] & RowDataPacket[]>(
      'SELECT * FROM Trybesmith.products WHERE name=?', 
      [name],
    );
    return product || null;
  };

  getAll = async (): Promise<IProduct[]> => {
    const [products] = await this.#connection
      .execute<IProduct[] & RowDataPacket[]>(
      'SELECT id, name, amount, order_id as orderId FROM Trybesmith.products',
    );
    return products;
  };

  update = async (orderId: number, productId: number): Promise<number> => {
    const [{ affectedRows }] = await this.#connection.execute<ResultSetHeader>(
      'UPDATE Trybesmith.products SET order_id=? WHERE id=?',
      [orderId, productId],
    );
    return affectedRows;
  };

  getById = async (id: number): Promise<IProduct | null> => {
    const [[product]] = await this.#connection.execute<IProduct[] & RowDataPacket[]>(
      'SELECT id, name, amount, order_id as orderId FROM Trybesmith.products WHERE id=?', 
      [id],
    );
    return product || null;
  };
}
