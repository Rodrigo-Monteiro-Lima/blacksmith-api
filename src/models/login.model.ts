import { RowDataPacket } from 'mysql2';
import { IUser } from '../interfaces/user.interface';
import connection from './connection';

export default class LoginModel {
  #connection;

  constructor() {
    this.#connection = connection;
  }

  login = async (
    username: string, 
  ): Promise<IUser | null> => {
    const [[user]] = await this.#connection.execute<IUser[] & RowDataPacket[]>(
      'SELECT * FROM Trybesmith.users WHERE username=?', 
      [username],
    );
    return user || null;
  };
}
