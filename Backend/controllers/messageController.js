import { db } from "../config/database.js";
import { conversations, messages } from "../../src/db/schema.ts";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { eq, or, and, arrayContains, desc, asc } from "drizzle-orm";

export const sendMessage = async (req, res, next) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;
    
    // Find conversation where participants contains both senderId and receiverId
    let conversationResult = await db.select().from(conversations)
      .where(
        and(
          arrayContains(conversations.participants, [senderId]),
          arrayContains(conversations.participants, [receiverId])
        )
      );
      
    let gotConversation = conversationResult[0];
    if(!gotConversation){
      const newConv = await db.insert(conversations).values({
        participants: [senderId, receiverId],
        messages: []
      }).returning();
      gotConversation = newConv[0];
    }
    
    const newMessageResult = await db.insert(messages).values({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    }).returning();
    
    const newMessage = newMessageResult[0];
    
    // Push the new message id to the conversation's messages array
    const updatedMessages = [...(gotConversation.messages || []), newMessage.id];
    await db.update(conversations)
      .set({ messages: updatedMessages })
      .where(eq(conversations.id, gotConversation.id));
      
    // Return _id for frontend compatibility
    const messageToReturn = { ...newMessage, _id: newMessage.id, senderId: newMessage.senderId, receiverId: newMessage.receiverId };
    
    //socket io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", messageToReturn);
    }
    return res.status(201).json({
      newMessage: messageToReturn
    })
  } catch(error) {
    return next(error);
  }
}

export const clearChat = async(req, res, next) => {
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

export const getMessage = async(req, res, next) => {
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
    
    if (!gotConversation || !gotConversation.messages || gotConversation.messages.length === 0) {
      return res.status(200).json([]);
    }
    
    // Fetch all messages in the conversation's messages array
    // To maintain order, we just fetch them and sort them by createdAt if needed
    // But since the IDs are added in order, it's fine.
    const messageIds = gotConversation.messages;
    
    // Using inArray could work, or we can just fetch where sender/receiver is these two
    // and sort by time. Actually fetching where id in messageIds is better.
    let msgs = [];
    for (const msgId of messageIds) {
       const msg = await db.select().from(messages).where(eq(messages.id, msgId));
       if(msg[0]) {
         msgs.push({ ...msg[0], _id: msg[0].id });
       }
    }
    
    return res.status(200).json(msgs);
  } catch(error) {
    return next(error);
  }
}

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
