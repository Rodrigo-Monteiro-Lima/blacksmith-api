import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IOrder } from '../interfaces/order.interface';
import connection from './connection';

export default class OrderModel {
  #connection = connection;

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

  // eslint-disable-next-line max-lines-per-function
  // createTransaction = async (
  //   productId: number, 
  //   userId: number,
  //   // productsIds: number[],
  //   alreadyRegistered: boolean | number | undefined,
  // ) => {
  //   try {
  //   // new Promise((resolve, _reject) => {
  //   //   this.#connection.query('START TRANSACTION').then(() => this.#connection
  //   //     .execute<ResultSetHeader>('INSERT INTO Trybesmith.orders (user_id) VALUES (?)', [userId]))
  //   //     .then(([{ insertId }]) => productsIds.map((productId) => this.#connection
  //   //       .execute(
  //   //         'UPDATE Trybesmith.products SET order_id=? WHERE id=?',
  //   //         [insertId, productId],
  //   //       ))).then(() => resolve(true))
  //   //     .catch((_e) => this.#connection.query('ROLLBACK'))
  //   //     .finally(() => this.#connection.query('COMMIT'));
  //   // })
  //     await this.#connection.query('START TRANSACTION');
  //     let id: any = alreadyRegistered;
  //     console.log(id, 'entrada');
  //     if (!alreadyRegistered) {
  //       const [{ insertId }] = await this.#connection
  //         .execute<ResultSetHeader>('INSERT INTO Trybesmith.orders (user_id) VALUES (?)', [userId]);
  //       id = insertId;
  //     }
  //     await this.#connection.execute<ResultSetHeader>(
  //       'UPDATE Trybesmith.products SET order_id=? WHERE id=?',
  //       [id, productId],
  //     );
  //     console.log(id, 'saida');
  //     await this.#connection.query('COMMIT');
  //     return { message: '', insertId: id };
  //   } catch (error: any) {
  //     await this.#connection.query('ROLLBACK');
  //     return { message: error.message };
  //   }
  // };
}