const fs = require('fs');
let code = fs.readFileSync('Backend/socket/socket.js', 'utf8');
code = code.replace(
  '  // send events to all the connected clients',
  `
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

  // send events to all the connected clients`
);
fs.writeFileSync('Backend/socket/socket.js', code);
