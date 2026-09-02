const fs = require('fs');
let code = fs.readFileSync('Backend/controllers/messageController.js', 'utf8');
code = code.replace(
  'export const getMessage = async(req, res, next) => {',
  `export const clearChat = async(req, res, next) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    
    const conversationResult = await db.select().from(conversations)
      .where(
        and(
          arrayContains(conversations.participants, [senderId]),
          arrayContains(conversations.participants, [receiverId])
        )
      );
      
    const gotConversation = conversationResult[0];
    if (gotConversation) {
      await db.update(conversations)
        .set({ messages: [] })
        .where(eq(conversations.id, gotConversation.id));
    }
    
    return res.status(200).json({ message: "Chat cleared successfully" });
  } catch(error) {
    return next(error);
  }
}

export const getMessage = async(req, res, next) => {`
);
fs.writeFileSync('Backend/controllers/messageController.js', code);
