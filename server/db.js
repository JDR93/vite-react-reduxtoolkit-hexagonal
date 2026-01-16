import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'hexagonal',
  port: 5432,
});
