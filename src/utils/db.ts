// utils/db.ts
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is missing');
}

export const pool = mysql.createPool({
  uri: DATABASE_URL, // Directly use the URL
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0,
});

export const getConnection = async () => {
  const connection = await pool.getConnection();
  return connection;
};
