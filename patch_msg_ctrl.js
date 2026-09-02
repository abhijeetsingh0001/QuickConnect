const fs = require('fs');
let code = fs.readFileSync('Backend/controllers/messageController.js', 'utf8');

code += `
export const markMessagesAsRead = async (req, res, next) => {
  try {
    const senderId = req.params.id; // The user whose messages we are marking as read (the other user)
    const receiverId = req.id; // The logged-in user who is reading them

    await db.update(messages)
      .set({ status: 'read' })
      .where(
        and(
          eq(messages.senderId, senderId),
          eq(messages.receiverId, receiverId),
          or(eq(messages.status, 'sent'), eq(messages.status, 'delivered'))
        )
      );

    // Notify the sender that their messages were read
    const senderSocketId = getReceiverSocketId(senderId);
    if(senderSocketId) {
      io.to(senderSocketId).emit("messagesRead", { receiverId }); // receiverId read them
    }

    return res.status(200).json({ success: true, message: "Messages marked as read" });
  } catch(error) {
    return next(error);
  }
}
`;

fs.writeFileSync('Backend/controllers/messageController.js', code);
