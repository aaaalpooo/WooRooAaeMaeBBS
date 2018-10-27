import mysql from 'mysql';
import utils from 'util';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'bbsAdmin',
  password: 'bbsAdmin123',
  database: 'springBootBbs',
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }
  if (connection) connection.release();
  return;
});

(pool as any).query = utils.promisify(pool.query);

export default pool;
