import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { INewProduct, IProduct } from '../interfaces/product.interface';
import connection from './connection';

export default class ProductModel {
  #connection = connection;

  create = async (product: INewProduct): Promise<IProduct> => {
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
}
