const fs = require('fs');
let code = fs.readFileSync('Backend/socket/socket.js', 'utf8');

code = code.replace(
  'import express from "express";',
  'import express from "express";\nimport { db } from "../config/database.js";\nimport { users } from "../../src/db/schema.ts";\nimport { eq } from "drizzle-orm";'
);

code = code.replace(
  '    if (userId) {\n      delete userSocketMap[userId];\n    }',
  `    if (userId) {
      delete userSocketMap[userId];
      db.update(users).set({ lastActive: new Date() }).where(eq(users.id, userId)).catch(err => console.error(err));
    }`
);

fs.writeFileSync('Backend/socket/socket.js', code);
