import postgres from 'postgres';
const sql = postgres({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
});
async function run() {
  try {
    const result = await sql`SELECT 1 as x`;
    console.log("Connected!", result);
    process.exit(0);
  } catch(e) {
    console.log("Error:", e);
    process.exit(1);
  }
}
run();
