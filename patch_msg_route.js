const fs = require('fs');
let code = fs.readFileSync('Backend/routes/messageRoute.js', 'utf8');

code = code.replace(
  'import { getMessage, sendMessage, clearChat } from "../controllers/messageController.js";',
  'import { getMessage, sendMessage, clearChat, markMessagesAsRead } from "../controllers/messageController.js";'
);

code = code.replace(
  'export default router;',
  'router.route("/read/:id").post(isAuthenticated, markMessagesAsRead);\nexport default router;'
);

fs.writeFileSync('Backend/routes/messageRoute.js', code);
