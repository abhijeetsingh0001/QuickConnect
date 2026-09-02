const fs = require('fs');
let code = fs.readFileSync('Backend/routes/messageRoute.js', 'utf8');
code = code.replace(
  'import { getMessage, sendMessage } from "../controllers/messageController.js";',
  'import { getMessage, sendMessage, clearChat } from "../controllers/messageController.js";'
);
code = code.replace(
  'router.route("/:id").get(isAuthenticated, getMessage);',
  'router.route("/:id").get(isAuthenticated, getMessage);\nrouter.route("/clear/:id").delete(isAuthenticated, clearChat);'
);
fs.writeFileSync('Backend/routes/messageRoute.js', code);
