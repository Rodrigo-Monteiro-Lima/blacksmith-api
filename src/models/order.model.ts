import { RowDataPacket } from 'mysql2';
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
}