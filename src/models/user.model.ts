import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { INewUSer, IUser } from '../interfaces/user.interface';
import connection from './connection';

export default class UserModel {
  #connection;

  constructor() {
    this.#connection = connection;
  }

  create = async (user: INewUSer): Promise<IUser> => {
    const { username, vocation, level, password } = user;
    const [{ insertId }] = await this.#connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.users (username, vocation, level, password) VALUES (?, ?, ?, ?)',
      [username, vocation, level, password],
    );
    return { id: insertId, ...user };
  };

  getByUsername = async (
    username: string, 
    vocation: string,
  ): Promise<IUser | null> => {
    const [[user]] = await this.#connection.execute<IUser[] & RowDataPacket[]>(
      'SELECT * FROM Trybesmith.users WHERE username=? AND vocation=?', 
      [username, vocation],
    );
    return user || null;
  };
}
