import express from "express";
import { getMessage, sendMessage, clearChat, markMessagesAsRead } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/:id").get(isAuthenticated, getMessage);
router.route("/clear/:id").delete(isAuthenticated, clearChat);

router.route("/read/:id").post(isAuthenticated, markMessagesAsRead);
export default router;