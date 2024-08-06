import pkg from 'pg';
import 'dotenv/config';
const { Pool } = pkg;
const pool = new Pool({
    user: String(process.env.DB_USER),
    host: String(process.env.DB_HOST),
    database: String(process.env.DB_NAME),
    password: String(process.env.DB_PASSWORD),
    port: Number(process.env.DB_PORT),
});
export default pool;
