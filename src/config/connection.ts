import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

//Connection pool for PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 5432,
});

// Test query with detailed logging
pool
  .query("SELECT NOW()")
  .then((result) => {
    console.log("Database connected successfully!");
    console.log("Connection test result:", result.rows[0]);
  })
  .catch((err) => console.log("Database connection error:", err));

// Add error handling to pool
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

export default pool;
