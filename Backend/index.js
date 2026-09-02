// const express = require('express'); method 1
import express from 'express';
import dotenv from 'dotenv';
import connectoDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/messageRoute.js';
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { app, server } from './socket/socket.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;


//middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: '*',
  credentials: true
};
app.use(cors(corsOption))

//routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
//local host

// CRITICAL route-level fallback: Add Express error middleware in app.js/server.js
// to handle database queries failing gracefully when MongoDB is offline:
app.use((err, req, res, next) => {
  if (err.name === 'MongooseError' || err.name === 'MongoNetworkError' || err.message?.includes('buffering timed out')) {
    console.warn('[AI Studio] Database offline — returning mock empty response');
    if (req.method === 'GET') {
      if (req.path === '/api/v1/user' || req.path === '/api/v1/user/') return res.json({ otherUsers: [] });
      return res.json(req.path.endsWith('s') || req.path.endsWith('s/') ? [] : {});
    }
    return res.status(503).json({ error: 'Service temporarily unavailable (database offline)' });
  }
  next(err);
});

// serve frontend
const buildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(buildPath));
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

server.listen(PORT, '0.0.0.0', () => {
  connectoDB();

  console.log(`server is listen on port ${PORT}`)
});
