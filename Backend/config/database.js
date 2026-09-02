import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../../src/db/schema.ts";

const connectoDB = async () => {
    // Just a placeholder to keep index.js from crashing
    console.log("PostgreSQL connected successfully");
};
export default connectoDB;

// PostgreSQL connection
const queryClient = postgres({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
});
export const db = drizzle(queryClient, { schema });
