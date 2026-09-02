import { db } from './Backend/config/database.js';
import { messages } from './src/db/schema.ts';

async function test() {
  const allMessages = await db.select().from(messages);
  console.log(allMessages.slice(-2)); // Print last 2 messages
}
test().then(() => process.exit(0)).catch(e => console.error(e));
