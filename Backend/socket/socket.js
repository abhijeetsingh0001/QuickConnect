import { Server } from "socket.io";
import http from "http";
import express from "express";
import { db } from "../config/database.js";
import { users } from "../../src/db/schema.ts";
import { eq } from "drizzle-orm";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const userSocketMap = {}; // { userId: socketId }

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  
  if (userId !== "undefined" && userId) {
    userSocketMap[userId] = socket.id;
  }


  socket.on("typing", (receiverId) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userTyping", userId);
    }
  });

  socket.on("stopTyping", (receiverId) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userStoppedTyping", userId);
    }
  });

  // send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    if (userId) {
      delete userSocketMap[userId];
      db.update(users).set({ lastActive: new Date() }).where(eq(users.id, userId)).catch(err => console.error(err));
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
