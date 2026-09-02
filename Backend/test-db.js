import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { User } from "./module/userModule.js";

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/mock');
  const users = await User.find({});
  console.log("Users in DB:", users.length);
  process.exit(0);
}
run();
