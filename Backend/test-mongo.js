import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  console.log("URI:", process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 20) + "..." : "NOT SET");
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected!");
    process.exit(0);
  } catch(e) {
    console.log("Error:", e.message);
    process.exit(1);
  }
}
run();
