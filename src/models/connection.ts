import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST,
} = process.env;

export default mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});