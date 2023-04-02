import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IOrder } from '../interfaces/order.interface';
import connection from './connection';

export default class OrderModel {
  #connection;

  constructor() {
    this.#connection = connection;
  }

  getAll = async (): Promise<IOrder[]> => {
    const [orders] = await this.#connection.execute<IOrder[] & RowDataPacket[]>(`
    SELECT ord.id, ord.user_id as userId, JSON_ARRAYAGG(pr.id) as productsIds
    FROM Trybesmith.orders AS ord INNER JOIN Trybesmith.products as pr 
    ON ord.id = pr.order_id GROUP BY ord.id`);
    return orders;
  };

  create = async (userId: number): Promise<number> => {
    const [{ insertId }] = await this.#connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.orders (user_id) VALUES (?)',
      [userId],
    );
    return insertId;
  };

  delete = async (id: number): Promise<void> => {
    await this.#connection.execute(
      'DELETE FROM Trybesmith.orders WHERE id=? ',
      [id],
    );
  };

  createTransaction = async (
    userId: number, 
    productsIds: number[],
  ): Promise<{ message: string }> => {
    const placeholders = Object.keys(productsIds).map((_key) => '?').join(', ');
    await this.#connection.query('START TRANSACTION');
    const [{ insertId }] = await this.#connection
      .execute<ResultSetHeader>('INSERT INTO Trybesmith.orders (user_id) VALUES (?)', [userId]);
    const [{ affectedRows }] = await this.#connection.execute<ResultSetHeader>(
      `UPDATE Trybesmith.products SET order_id=? WHERE id IN (${placeholders})`,
      [insertId, ...productsIds],
    );
    if (affectedRows !== productsIds.length) {
      await this.#connection.query('ROLLBACK');
      return { message: 'Error has occurred' };
    } 
    await this.#connection.query('COMMIT');
    return { message: '' };
  };
}