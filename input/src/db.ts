// src/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'myuser',
  host: process.env.DB_HOST || 'localhost', // "my-postgres" will be used when provided
  database: process.env.DB_NAME || 'mydb',
  password: process.env.DB_PASSWORD || 'mypassword',
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

export default pool;
